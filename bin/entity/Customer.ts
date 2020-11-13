import {Moment} from "moment";
import {Purchase} from "./Purchase";
import {Product} from "./Product";
import {SpecialPromotion} from "../profiling/SpecialPromotion";
import {Rel8} from "../profiling/Rel8";
import {LikeMyStuff} from "../profiling/LikeMyStuff";
import {DateUtils} from "../utils/DateUtils";

export class Customer {

  //indica se il cliente ha attivato o meno la profilazione
  _isProfilingActive: boolean;
  name: string;
  purchases: Purchase[];

  constructor(isProfilingActive: boolean, name: string, purchases) {
    this._isProfilingActive = isProfilingActive;
    this.name = name;
    this.purchases = purchases;
  }

  isProfilingActive(): boolean{
    return this._isProfilingActive;
  }

  getPurchasesSince(sinceDate: Moment): number{
    //dalla lista acquisti conto solo i prodotti acquistati dalla data richiesta in poi
    return this.purchases.filter((element) => element.date.isAfter(sinceDate)).length;
  }

  async getRecomanded(): Promise<Product>{
    //console.log("controllo se esiste una promozione in corso")
    let promotionalProduct: string = SpecialPromotion.getPromotionName();

    if(promotionalProduct) {
      //console.log("restituisco il primo prodotto il cui nome corrisponde con quello della promozione (assumo che il nome sia PK nel database)")
      return Promise.resolve(Product.lookup(promotionalProduct));

    }else{

      //console.log("la promozione non esiste, controllo se il cliente ha attivato il profiling")
      if (this.isProfilingActive()) {

        //console.log("recupero il prodotto da consigliare tramite Rel8")
        return await Rel8.advise(this);

      } else{

        //console.log("prendo la data attuale")
        let lastYear: Moment = DateUtils.getLastYearDate();

        //console.log("controllo se sono stati effettuati acquisti nell'ultimo anno")
        if(this.getPurchasesSince(lastYear)>0){

          //console.log("recupero il prodotto da consigliare tramite Rel8")
          return Promise.resolve(LikeMyStuff.suggest(this));

        }else{

          //console.log("devo restituire un prodotto casuale")
          return Promise.resolve(Product.getRandom());

        }
      }
    }
  }
}
