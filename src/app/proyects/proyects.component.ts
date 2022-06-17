import { Component, OnInit } from '@angular/core';
import { Proyect } from './proyect';
import { ProyectService } from './proyect.service';


@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',

})
export class ProyectsComponent implements OnInit {

  proyects: Proyect [];


  constructor(private proyectService: ProyectService) { 
   
    this.proyectService.getProyects().subscribe(
      proyects => this.proyects = proyects
   );
  }

  ngOnInit(): void {
  }

}
/*prueba git*/