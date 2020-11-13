import {Customer} from "../entity/Customer";
import {Product} from "../entity/Product";
import {MockDB} from "../mock/MockDB";
import {Market} from "../utils/Market";

export class LikeMyStuff{
  static suggest(customer:Customer):Product{
    return Market.likeMyStuff;
  }
}
