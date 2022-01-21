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
