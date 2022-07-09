import { Video } from "../videos/models/video";
import { Region } from "./region";

export class Proyect {

    id: number;
    name: string;
    intention: string;   
    createAt: string;
    technology: string;
    email: string;
    image:string;
    region:Region;
    videos: Array<Video> = [];
    


}
