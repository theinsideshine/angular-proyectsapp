import { Injectable } from '@angular/core';
//import { PROYECTS } from './proyects.json';
import { Proyect } from './proyect';
import { catchError, Observable, of ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Injectable()
export class ProyectService {
 
  private urlEndPoint:string = 'http://localhost:8080/api/proyects';
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
 
  constructor(private http: HttpClient, private router: Router) { }


  getProyects(): Observable <Proyect[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map ( (response)=> response  as Proyect[])
    );
  } 

  
  create(proyect: Proyect): Observable<Proyect> {
    return this.http.post<Proyect>(this.urlEndPoint, proyect, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.proyect as Proyect),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getProyect(id): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e =>{
        this.router.navigate(['/proyects']);
        console.error(e.error.mensaje);
        swal('Error al editar',e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  

  update(proyect: Proyect): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${proyect.id}`, proyect, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
 
 

  delete(id: number): Observable<Proyect> {
    return this.http.delete<Proyect>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
