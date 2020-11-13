import {Moment} from "moment";
import {Product} from "./Product";

export type Purchase = {
  product: Product;
  date: Moment;
}
