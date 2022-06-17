import { Injectable } from '@angular/core';
import { PROYECTS } from './proyects.json';
import { Proyect } from './proyect';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  constructor() { 

  }

  getProyects(): Observable <Proyect[]>{
    return of(PROYECTS);
  } 
}
