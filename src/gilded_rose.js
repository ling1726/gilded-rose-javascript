export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const MIN_SELLIN = 0;
const BACKSTAGE_PASS_QUALITY_2 = 11;
const BACKSTAGE_PASS_QUALITY_3 = 6;


function increaceQuality(item) {
    if (item.quality < MAX_QUALITY) {
        item.quality = item.quality + 1;
    }
}

function decreaseQuality(item) {
    if (item.quality > MIN_QUALITY) {
        item.quality = item.quality - 1;
    }
}

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach((item) => {
            if (item.name === SULFURAS) {
                return;
            }
            if (item.name !== AGED_BRIE && item.name !== BACKSTAGE_PASS) {
                decreaseQuality(item);
            } else {
                if (item.quality < MAX_QUALITY) {
                    item.quality = item.quality + 1;
                    if (item.name === BACKSTAGE_PASS) {
                        if (item.sellIn < BACKSTAGE_PASS_QUALITY_2) {
                            increaceQuality(item);
                        }
                        if (item.sellIn < BACKSTAGE_PASS_QUALITY_3) {
                            increaceQuality(item);
                        }
                    }
                }
            }

            item.sellIn = item.sellIn - 1;

            if (item.sellIn < MIN_SELLIN) {
                if (item.name !== AGED_BRIE) {
                    if (item.name !== BACKSTAGE_PASS) {
                        decreaseQuality(item)
                    } else {
                        item.quality = 0;
                    }
                } else {
                    increaceQuality(item);
                }
            }

        })

        return this.items;
    }
}
