const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const MIN_DATE = 0;

export class Item {
  /**
   * Name of the item
   * @param {string} name 
   * @param {number} sellIn
   * @param {number} quality
   */
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decrementQuality () { return this.quality -= 1; }
  incrementQuality () { return this.quality += 1 }
  destroyItem () { return this.quality = 0 }
  decrementSellIn () { return this.sellIn -= 1 }
  canIncreaseQuality () {return this.quality < MAX_QUALITY}
  isBroken () { return this.quality <= MIN_QUALITY }
  isExpired () {return this.sellIn < MIN_DATE}
}

export class StandardItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    if (this.sellIn <= 0) {
      this.quality = Math.max(0, this.quality - 2);
    } else {
      this.quality = Math.max(0, this.quality - 1);
    }
  }

  static isInstance(item) {
    return item instanceof (StandardItem);
  }
}

export class AgedBrie extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  static isInstance(item) {
    return item instanceof (AgedBrie);
  }
}

export class BackstagePass extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  static isInstance(item) {
    return item instanceof (BackstagePass);
  }

  static isDoublePrice(item) {
    if (!(item instanceof BackstagePass)) {
      throw new Error('Item is not a backstage pass');
    }

    return item.sellIn < 11;
  }

  static isTriplePrice(item) {
    if (!(item instanceof BackstagePass)) {
      throw new Error('Item is not a backstage pass');
    }

    return item.sellIn < 6;
  }
}

export class LegendaryItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  static isInstance(item) {
    return item instanceof (LegendaryItem);
  }
}

export class ConjuredItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    this.decrementSellIn();

    if (this.isExpired()) {
      this.quality = Math.max(MIN_QUALITY, this.quality - 4);
    } else {
      this.quality = Math.max(MIN_QUALITY, this.quality - 2);
    }
  }

  static isInstance(item) {
    return item instanceof (ConjuredItem);
  }
}
