import {Product} from "../entity/Product";
import {Customer} from "../entity/Customer";
import {MockDB} from "../mock/MockDB";
import {setTimeout} from 'timers';
import {Market} from "../utils/Market";

export class Rel8 {
  static async advise(customer: Customer): Promise<Product>{
    //probabilemnte verranno inviati i dati del customer ad una rete di IA in grado di generare il prodotto sponsorizzato
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Market.rel8)
      }, 100)
    });
  }
}

