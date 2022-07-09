import { Product } from "./product";

export class ItemVideo {

  product: Product;
  quantity: number = 1;
  amount: number;

  public amountCalculate(): number {
    return this.quantity * this.product.price;
  }
}
