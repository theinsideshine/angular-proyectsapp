import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectService } from '../proyects/proyect.service';
import { Video } from './models/video';
import { VideosService } from './service/videos.service';
import swal from 'sweetalert2';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemVideo } from './models/item-video';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  
})

export class VideosComponent implements OnInit {

  tittle: string = 'Nuevo  Video';
  video: Video = new Video();


  autocompleteControl = new FormControl();
  products : string[]=['mesa','tablet','silla'];
  productsFilter: Observable<Product[]>;

  constructor(private proyectService: ProyectService,
    private videoService: VideosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let proyectId = +params.get('proyectId');
      this.proyectService.getProyect(proyectId).subscribe(proyect => this.video.proyect = proyect);
    });

    this.productsFilter = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value : value.name),
      flatMap(value => value ? this._filter(value): [])
      );
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();

    return this.videoService.filterProducts(filterValue);
  }

  nameView(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  productSelect(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as Product;
    console.log(product);

    if (this.itemExist(product.id)) {
      this.quantityIncrement(product.id);
    } else {
      let nuevoItem = new ItemVideo();
      nuevoItem.product = product;
      this.video.items.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  itemExist(id: number): boolean {
    let existe = false;
    this.video.items.forEach((item: ItemVideo) => {
      if (id === item.product.id) {
        existe = true;
      }
    });
    return existe;
  }


  quantityUpdate(id: number, event: any): void {
    let quantity: number = event.target.value as number;

    if (quantity == 0) {
      return this.deleteItemVideo(id);
    }

    this.video.items = this.video.items.map((item: ItemVideo) => {
      if (id === item.product.id) {
        item.quantity = quantity;
      }
      return item;
    });
  }
  quantityIncrement(id: number): void {
    this.video.items = this.video.items.map((item: ItemVideo) => {
      if (id === item.product.id) {
        ++item.quantity;
      }
      return item;
    });
  }

  deleteItemVideo(id: number): void {
    this.video.items = this.video.items.filter((item: ItemVideo) => id !== item.product.id);
  }

  create(videoForm): void {
    console.log(this.video);
    if (this.video.items.length == 0) {
      this.autocompleteControl.setErrors({ 'invalid': true });
    }

    if (videoForm.form.valid && this.video.items.length > 0) {
      this.videoService.create(this.video).subscribe(video => {
        swal(this.tittle, `Video ${this.video.description} creada con éxito!`, 'success');
        this.router.navigate(['/proyects']);
      });
    }
  }
}
