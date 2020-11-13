import {Product} from "../entity/Product";
import {Customer} from "../entity/Customer";
import moment = require("moment");

export class MockDB {
  public static products: Product[] = [
    new Product('P1'),
    new Product('P2'),
    new Product('P3'),
    new Product('P4'),
    new Product('P5'),
    new Product('P6'),
    new Product('P7'),
    new Product('P8'),
  ];

  public static customers: Customer[] = [
    new Customer(true,'C1_profiling', [
      {product: MockDB.products[0], date: moment().subtract(10, 'day') },
      {product: MockDB.products[0], date: moment().subtract(100, 'day') },
    ]),
    new Customer(false,'C2_no_profiling', [
      {product: MockDB.products[0], date: moment().subtract(10, 'day') },
      {product: MockDB.products[0], date: moment().subtract(100, 'day') },
    ]),
    new Customer(true,'C3_profiling_no_shop', []),
    new Customer(false,'C4_no_profiling_no_shop', []),
    new Customer(true,'C5_profiling_no_shop_last_year', [
      {product: MockDB.products[0], date: moment().subtract(400, 'day') },
      {product: MockDB.products[0], date: moment().subtract(410, 'day') },
    ]),
    new Customer(false,'C6_no_profiling_no_shop_last_year', [
      {product: MockDB.products[0], date: moment().subtract(400, 'day') },
      {product: MockDB.products[0], date: moment().subtract(410, 'day') },
    ]),
  ];
}
