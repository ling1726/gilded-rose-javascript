import { AgedBrie, BackstagePass, LegendaryItem, StandardItem } from './items';

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
   * Called at the end of the day.
   * TODO what it does
   * @returns 
   */
  updateQuality() {
    const decrementQuality = (item) => item.quality -= 1;
    const incrementQuality = (item) => item.quality += 1;
    const destroyItem = (item) => item.quality = 0;
    const decrementSellIn = (item) => item.sellIn -= 1;
    const canIncreaseQuality = (item) => item.quality < MAX_QUALITY;
    const isBroken = (item) => item.quality <= MIN_QUALITY;
    const isExpired = (item) => item.sellIn < MIN_DATE;

    this.items.forEach(item => {
      // Items that decrease in quality
      if (!AgedBrie.isInstance(item) && !BackstagePass.isInstance(item)) {
        if (!isBroken(item)) {
          if (!LegendaryItem.isInstance(item)) {
            // Standard item
            decrementQuality(item);
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
          if (!BackstagePass.isInstance(item)) {
            if (!isBroken(item)) {
              if (!LegendaryItem.isInstance(item)) {
                // StandardItem
                decrementQuality(item);
              }
            }
          } else {
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

    });

    return this.items;
  }
}
