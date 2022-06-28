import { Injectable } from '@angular/core';
//import { PROYECTS } from './proyects.json';
import { Proyect } from './proyect';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable()
export class ProyectService {
 
  private urlEndPoint:string = 'http://localhost:8080/api/proyects';
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
 
  constructor(private http: HttpClient) { }


  getProyects(): Observable <Proyect[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map ( (response)=> response  as Proyect[])
    );
  } 

  create (proyect: Proyect ): Observable<Proyect> {
    return this.http.post<Proyect>(this.urlEndPoint,proyect,{headers:this.httpHeaders})

  }

  getProyect(id: any): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.urlEndPoint}/${id}`)
  }

  update(proyect: Proyect): Observable<Proyect> {
    return this.http.put<Proyect>(`${this.urlEndPoint}/${proyect.id}`, proyect, { headers: this.httpHeaders })
  }
 
  delete(id: number): Observable<Proyect> {
    return this.http.delete<Proyect>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders })
  }

}
