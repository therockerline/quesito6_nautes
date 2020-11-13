import {Product} from "./entity/Product";
import {Customer} from "./entity/Customer";


function main(args: string[]): void{

}


export async function quesito6(customer: Customer): Promise<Product> {
    let prod = await customer.getRecomanded();
    //console.log(prod)
    return prod;
}
