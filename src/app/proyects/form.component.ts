import { Component, OnInit } from '@angular/core';


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
  public tittle:string = "Crear Proyecto";
  errores: string[];

  constructor(private proyectService: ProyectService,
    private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProyect()
    
  }

  loadProyect(): void{
    
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      
      if(id){
        this.proyectService.getProyect(id).subscribe( (proyect) => this.proyect = proyect)
        
      }
    })
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
}