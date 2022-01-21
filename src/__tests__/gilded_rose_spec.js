import { Shop } from '../gilded_rose';
import { Item } from '../items';

describe("Gilded Rose", function () {
    const gildedRose = new Shop([]);

    beforeEach(() => {
        gildedRose.clearItems();
    })


    // TODO contact original test author
    xit("should foo", function () {
        gildedRose.pushItem(new Item("foo", 0, 0));
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("fixme");
    });

    describe('Conjured item', () => {
        describe('Before sellin', () => {
            const standardTestCases = [
                {
                    itemName: 'Conjured',
                    initialQuality: 10,
                    expectedQuality: 8,
                },
                {
                    itemName: 'Conjured',
                    initialQuality: 0,
                    expectedQuality: 0,
                },
            ]

            // Standard conditions
            standardTestCases.forEach((testCase) => {
                const { initialQuality, itemName, expectedQuality } = testCase;
                it(`should increase ${itemName} quality from ${initialQuality} to ${expectedQuality}`, () => {
                    gildedRose.pushItem(new Item(itemName, 1, initialQuality));
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).toEqual(expectedQuality);
                });
            })


        })



        describe('After sellin', () => {
            const afterSellInTestCases = [
                {
                    itemName: 'Conjured',
                    initialQuality: 10,
                    expectedQuality: 6,
                },
                {
                    itemName: 'Conjured',
                    initialQuality: 0,
                    expectedQuality: 0,
                },
            ]
            afterSellInTestCases.forEach((testCase) => {
                const { initialQuality, itemName, expectedQuality } = testCase;
                it(`should increase ${itemName} quality from ${initialQuality} to ${expectedQuality}`, () => {
                    gildedRose.pushItem(new Item(itemName, -1, initialQuality));
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).toEqual(expectedQuality);
                });
            })
        })
    });

    describe('Aged Brie', () => {
        describe('Before sellin', () => {
            const standardTestCases = [
                {
                    itemName: 'Aged Brie',
                    initialQuality: 10,
                    expectedQuality: 11,
                },
                {
                    itemName: 'Aged Brie',
                    initialQuality: 50,
                    expectedQuality: 50,
                },
            ]

            // Standard conditions
            standardTestCases.forEach((testCase) => {
                const { initialQuality, itemName, expectedQuality } = testCase;
                it(`should increase ${itemName} quality from ${initialQuality} to ${expectedQuality}`, () => {
                    gildedRose.pushItem(new Item(itemName, 1, initialQuality));
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).toEqual(expectedQuality);
                });
            })
        })

        describe('After sellin', () => {
            const afterSellInTestCases = [
                {
                    itemName: 'Aged Brie',
                    initialQuality: 10,
                    expectedQuality: 12,
                },
                {
                    itemName: 'Aged Brie',
                    initialQuality: 49,
                    expectedQuality: 50,
                },
            ]
            afterSellInTestCases.forEach((testCase) => {
                const { initialQuality, itemName, expectedQuality } = testCase;
                it(`should increase ${itemName} quality from ${initialQuality} to ${expectedQuality}`, () => {
                    gildedRose.pushItem(new Item(itemName, -1, initialQuality));
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).toEqual(expectedQuality);
                });
            })
        })
    });

    describe('Standard item', () => {

        describe('Before sellin', () => {
            const standardTestCases = [
                {
                    itemName: 'foo',
                    initialQuality: 10,
                    expectedQuality: 9,
                },
                {
                    itemName: 'foo',
                    initialQuality: 0,
                    expectedQuality: 0,
                },
            ]

            // Standard conditions
            standardTestCases.forEach((testCase) => {
                const { initialQuality, itemName, expectedQuality } = testCase;
                it(`should increase ${itemName} quality from ${initialQuality} to ${expectedQuality}`, () => {
                    gildedRose.pushItem(new Item(itemName, 1, initialQuality));
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).toEqual(expectedQuality);
                });
            })


        })



        describe('After sellin', () => {
            const afterSellInTestCases = [
                {
                    itemName: 'foo',
                    initialQuality: 10,
                    expectedQuality: 8,
                },
                {
                    itemName: 'foo',
                    initialQuality: 0,
                    expectedQuality: 0,
                },
            ]
            afterSellInTestCases.forEach((testCase) => {
                const { initialQuality, itemName, expectedQuality } = testCase;
                it(`should increase ${itemName} quality from ${initialQuality} to ${expectedQuality}`, () => {
                    gildedRose.pushItem(new Item(itemName, -1, initialQuality));
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).toEqual(expectedQuality);
                });
            })
        })
    })

    describe('Legendary item', () => {
        describe('Before sellin', () => {
            const standardTestCases = [

                {
                    itemName: 'Sulfuras, Hand of Ragnaros',
                    initialQuality: 80,
                    expectedQuality: 80,
                }
                // TODO write more test cases
            ]

            // Standard conditions
            standardTestCases.forEach((testCase) => {
                const { initialQuality, itemName, expectedQuality } = testCase;
                it(`should increase ${itemName} quality from ${initialQuality} to ${expectedQuality}`, () => {
                    gildedRose.pushItem(new Item(itemName, 1, initialQuality));
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).toEqual(expectedQuality);
                });
            })


        })



        describe('After sellin', () => {
            const afterSellInTestCases = [
                {
                    itemName: 'Sulfuras, Hand of Ragnaros',
                    initialQuality: 80,
                    expectedQuality: 80,
                }
            ]
            afterSellInTestCases.forEach((testCase) => {
                const { initialQuality, itemName, expectedQuality } = testCase;
                it(`should increase ${itemName} quality from ${initialQuality} to ${expectedQuality}`, () => {
                    gildedRose.pushItem(new Item(itemName, -1, initialQuality));
                    const items = gildedRose.updateQuality();
                    expect(items[0].quality).toEqual(expectedQuality);
                });
            })
        })
    })

    describe('Backstage passes', () => {
        const backstagePassTestCases = [
            {
                itemName: 'Backstage passes to a TAFKAL80ETC concert',
                initialQuality: 10,
                expectedQuality: 11,
                sellIn: 11
            },
            {
                itemName: 'Backstage passes to a TAFKAL80ETC concert',
                initialQuality: 10,
                expectedQuality: 12,
                sellIn: 9
            },
            {
                itemName: 'Backstage passes to a TAFKAL80ETC concert',
                initialQuality: 10,
                expectedQuality: 13,
                sellIn: 4
            },
            {
                itemName: 'Backstage passes to a TAFKAL80ETC concert',
                initialQuality: 10,
                expectedQuality: 13,
                sellIn: 5,
            },
            {
                itemName: 'Backstage passes to a TAFKAL80ETC concert',
                initialQuality: 10,
                expectedQuality: 12,
                sellIn: 10,
            },
            {
                itemName: 'Backstage passes to a TAFKAL80ETC concert',
                initialQuality: 50,
                expectedQuality: 50,
                sellIn: 10
            },
            {
                itemName: 'Backstage passes to a TAFKAL80ETC concert',
                initialQuality: 50,
                expectedQuality: 0,
                sellIn: 0
            },
            {
                itemName: 'Backstage passes to a TAFKAL80ETC concert',
                initialQuality: 49,
                expectedQuality: 50,
                sellIn: 10
            },
            {
                itemName: 'Backstage passes to a TAFKAL80ETC concert',
                initialQuality: 49,
                expectedQuality: 50,
                sellIn: 5,
            }

        ]

        // Standard conditions
        backstagePassTestCases.forEach((testCase) => {
            const { initialQuality, itemName, expectedQuality, sellIn } = testCase;
            it(`should increase ${itemName} quality from ${initialQuality} to ${expectedQuality} at day ${sellIn}`, () => {
                gildedRose.pushItem(new Item(itemName, sellIn, initialQuality));
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(expectedQuality);
            });
        })

    })

});
