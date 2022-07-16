import { Injectable } from '@angular/core';
//import { PROYECTS } from './proyects.json';
import { Proyect } from './proyect';
import { catchError, Observable, of ,throwError} from 'rxjs';
import { HttpClient,  HttpEvent , HttpRequest} from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

import { Region } from './region';

import { URL_BACKEND } from '../config/config';


@Injectable()
export class ProyectService {
 
  private urlEndPoint:string = URL_BACKEND+'/api/proyects';
  
 
  constructor(private http: HttpClient, private router: Router ) { }




  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regions')
  }


  getProyects(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(/*
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      }),*/
      map((response: any) => {
        (response.content as Proyect[]).map(proyect => {
          proyect.name = proyect.name.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          return proyect;
        });
        return response;
      }),/*
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      })*/
    );
  }

  
  create(proyect: Proyect): Observable<Proyect> {
    return this.http.post<Proyect>(this.urlEndPoint, proyect).pipe(
      map((response: any) => response.proyect as Proyect),
      catchError(e => {

        

       
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
      
        return throwError(e);
      })
    );
  }

  getProyect(id): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e =>{
      
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/proyects']);
          console.error(e.error.mensaje);
        }
        
        
        return throwError(e);
      })
    );
  }

  

  update(proyect: Proyect): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${proyect.id}`, proyect).pipe(
      catchError(e => {


        

        if (e.status == 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        
        return throwError(e);
      })
    );
  }
 
 

  delete(id: number): Observable<Proyect> {
    return this.http.delete<Proyect>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

       
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
      
        return throwError(e);
      })
    );
  }

   
      uploadImage(file: File, id): Observable<HttpEvent<{}>> {

        let formData = new FormData();
        formData.append("file", file);
        formData.append("id", id);

       
    
        const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
          reportProgress: true,
          
        });
    
        return this.http.request(req);
      }
    
      
      

}
