import { Proyect } from "src/app/proyects/proyect";
import { ItemVideo } from "./item-video";

export class Video {

  id: number;
  description: string;
  observation: string;
  videoUrl: string;
  items: Array<ItemVideo> = [];
  proyet: Proyect;
  total: number;
  createAt: string;

  totalCalculate(): number {
    this.total = 0;
    this.items.forEach((item: ItemVideo) => {
      this.total += item.amountCalculate();
    });
    return this.total;
  }
}
