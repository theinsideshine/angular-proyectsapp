import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private urlEndPoint: string = 'http://localhost:8080/api/videos';

  constructor(private http: HttpClient) { }

  getVideo(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
/*
  filtrarProductos(term: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`);
  }
*/
  create(video: Video): Observable<Video> {
    return this.http.post<Video>(this.urlEndPoint, video);
  }
}
