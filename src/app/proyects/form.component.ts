import { Component, OnInit } from '@angular/core';
import { Region } from './region';


import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2' 

import { Proyect } from './proyect';
import { ProyectService } from './proyect.service';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html'
 
})
export class FormComponent implements OnInit {

  public proyect: Proyect = new Proyect();
  regions: Region[];
  public tittle:string = "Crear Proyecto";
  errores: string[];

  constructor(private proyectService: ProyectService,
    private router: Router,private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(params => {
        let id = +params.get('id');
        if (id) {
          this.proyectService.getProyect(id).subscribe((proyect) => this.proyect = proyect);
        }
      });
  
      this.proyectService.getRegions().subscribe(regions => this.regions= regions);
    }

 

  public create():void {
    this.proyectService.create(this.proyect)
    .subscribe( proyect => {
      this.router.navigate(['/proyects'])
      swal('Nuevo proyecto', `Proyecto ${proyect.name} creado con éxito!`, 'success')
    },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update():void{
    console.log(this.proyect);
    this.proyect.videos = null;
    this.proyectService.update(this.proyect)
    .subscribe( json => {
      this.router.navigate(['/proyects'])
      swal('Proyecto Actualizado', `${json.mensaje}: ${json.proyect.name}`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
   );
  }

  compareRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
}