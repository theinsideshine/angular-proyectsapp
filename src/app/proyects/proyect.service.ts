import { Injectable } from '@angular/core';
//import { PROYECTS } from './proyects.json';
import { Proyect } from './proyect';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable()
export class ProyectService {
  private urlEndPoint:string = 'http://localhost:8080/api/proyects';
  constructor(private http: HttpClient) { }


  getProyects(): Observable <Proyect[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map ( (response)=> response  as Proyect[])
    );
  } 
}
