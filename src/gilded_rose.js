import { AgedBrie, BackstagePass, ConjuredItem, LegendaryItem, StandardItem } from './items';

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const MIN_DATE = 0;

export class Shop {
  constructor(items = []) {
    this.items = items.map(item => {
      return this._convertLegacyItem(item);
    });
  }

  _convertLegacyItem(item) {
    switch (item.name) {
      case 'Aged Brie':
        return new AgedBrie(item.name, item.sellIn, item.quality);
      case 'Sulfuras, Hand of Ragnaros':
        return new LegendaryItem(item.name, item.sellIn, item.quality);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePass(item.name, item.sellIn, item.quality);
      case 'Conjured':
        return new ConjuredItem(item.name, item.sellIn, item.quality);
      default:
        return new StandardItem(item.name, item.sellIn, item.quality);
    }
  }

  pushItem(item) {
    this.items.push(this._convertLegacyItem(item));
  }

  clearItems() {
    this.items = [];
  }

  /**
   * Legacy method to update the quality of items
   * If introducing new items, please introduce a new domain model that extends {@see Item} i.e. {@see ConjuredItem}
   * @param {Item} item 
   * @deprecated
   */
  legacyUpdateQuality(item) {
    const decrementQuality = (item) => item.quality -= 1;
    const incrementQuality = (item) => item.quality += 1;
    const destroyItem = (item) => item.quality = 0;
    const decrementSellIn = (item) => item.sellIn -= 1;
    const canIncreaseQuality = (item) => item.quality < MAX_QUALITY;
    const isBroken = (item) => item.quality <= MIN_QUALITY;
    const isExpired = (item) => item.sellIn < MIN_DATE;

    // Items that decrease in quality
    if (!AgedBrie.isInstance(item) && !BackstagePass.isInstance(item)) {
      if (!isBroken(item)) {
        if (!LegendaryItem.isInstance(item)) {
          if (isExpired(item)) {
            decrementQuality(item);
          }
          if (!isBroken(item)) {
            // Standard item
            decrementQuality(item);
          }
        }
      }
    } else { // Aged brie or backstage pass 
      if (canIncreaseQuality(item)) {
        incrementQuality(item);
        if (BackstagePass.isInstance(item)) {
          if (BackstagePass.isDoublePrice(item)) {
            if (canIncreaseQuality(item)) {
              incrementQuality(item);
            }
          }
          if (BackstagePass.isTriplePrice(item)) {
            if (canIncreaseQuality(item)) {
              incrementQuality(item);
            }
          }
        }
      }
    }
    if (!LegendaryItem.isInstance(item)) {
      decrementSellIn(item);
    }
    if (isExpired(item)) {
      if (!AgedBrie.isInstance(item)) {
        if (BackstagePass.isInstance(item)) {
          // BackstagePass
          destroyItem(item);
        }
      } else {
        // AgedBrie
        if (canIncreaseQuality(item)) {
          incrementQuality(item);
        }
      }
    }
  }

  /**
   * Checks if item does not yet have a valid domain model to update quality
   * @param {Item} item 
   */
  isLegacyItem(item) {
    return StandardItem.isInstance(item) || AgedBrie.isInstance(item) || LegendaryItem.isInstance(item) || BackstagePass.isInstance(item);
  }

  /**
   * Called at the end of the day.
   * TODO what it does
   * @returns 
   */
  updateQuality() {
    this.items.forEach(item => {
      if (!this.isLegacyItem(item)) {
        item.updateQuality();
      } else {
        this.legacyUpdateQuality(item);
      }

    });

    return this.items;
  }
}
