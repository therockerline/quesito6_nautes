import {quesito6} from "../bin";
import {MockDB} from "../bin/mock/MockDB";
import {Market} from "../bin/utils/Market";
import {Product} from "../bin/entity/Product";

var assert = require('assert');
describe('Test all mock customers', function() {
    new MockDB();
    new Market();
    Market.rel8 = MockDB.products[1];
    Market.likeMyStuff = MockDB.products[3];
    Market.randomProduct = MockDB.products[2];

    describe('C1_profiling', function() {
        it('utente profilato con acquisti nell\'ultimo anno => rel8', async function() {
            let product: Product = await quesito6(MockDB.customers[0]);
            assert.strictEqual(product, Market.rel8);
        });
    });

    describe('C2_no_profiling', function() {
        it('utente NON profilato con acquisti nell\'ultimo anno => likeMyStuff', async function() {
            let product: Product = await quesito6(MockDB.customers[1]);
            assert.strictEqual(product, Market.likeMyStuff);
        });
    });

    describe('C3_profiling_no_shop', function() {
        it('utente profilato + nessun acquisto => rel8', async function() {
            let product: Product = await quesito6(MockDB.customers[2]);
            assert.strictEqual(product, Market.rel8);
        });
    });

    describe('C4_no_profiling_no_shop', function() {
        it('utente NON profilato + nessun acquisto => randomProduct', async function() {
            let product: Product = await quesito6(MockDB.customers[3]);
            assert.strictEqual(product, Market.randomProduct);
        });
    });

    describe('C5_profiling_no_shop_last_year', function() {
        it('utente profilato + nessun acquisto nell\'ultimo anno => rel8', async function() {
            let product: Product = await quesito6(MockDB.customers[4]);                //utente NON profilato + nessuna offerta speciale => likeMyStuff
            assert.strictEqual(product, Market.rel8);
        });
    });

    describe('C6_no_profiling_no_shop_last_year', function() {
        it('utente NON profilato + nessun acquisto nell\'ultimo anno => randomProduct', async function() {
            let product: Product = await quesito6(MockDB.customers[5]);
            assert.strictEqual(product, Market.randomProduct);
        });
    });

    describe('C1_profiling + special promotion', function() {
        it(`utente profilato ma con offerta speciale dello shop (vale anche per gli altri customer) => ${MockDB.products[0].name}`, async function() {
            Market.specialOffer = MockDB.products[0].name;
            let product: Product = await quesito6(MockDB.customers[0]);
            //utente NON profilato + nessuna offerta speciale => likeMyStuff
            assert.strictEqual(product, Product.lookup(Market.specialOffer));
        });
    });
});
