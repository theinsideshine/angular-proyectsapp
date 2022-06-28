import { Component, OnInit } from '@angular/core';
import { Proyect } from './proyect';
import { ProyectService } from './proyect.service';

import swal from 'sweetalert2'


@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',

})
export class ProyectsComponent implements OnInit {

  proyects: Proyect [];


  constructor(private proyectService: ProyectService) { 
   
   
  }

  ngOnInit(): void {
    this.proyectService.getProyects().subscribe(
      proyects => this.proyects = proyects
   );
  }
  delete(proyect: Proyect): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${proyect.name} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.proyectService.delete(proyect.id).subscribe(
          response => {
            this.proyects = this.proyects.filter(cli => cli !== proyect)
            swal(
              'Cliente Eliminado!',
              `Cliente ${proyect.name} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
/*prueba git*/