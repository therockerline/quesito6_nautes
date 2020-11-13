import {MockDB} from "../mock/MockDB";
import {Market} from "../utils/Market";

export class Product{
  //proprietà della classe
  name: string;
  constructor(name) {
    this.name = name;
  }
  //ritorna un prodotto casuale
  static getRandom():Product{
    //return MockDB.products[Math.random() * MockDB.products.length];
    return Market.randomProduct;
  }

  //ritorna il prodotto con il nome passato come parametro
  static lookup(name: string): Product{
    return MockDB.products.find((elem) => elem.name === name);
  }
}
