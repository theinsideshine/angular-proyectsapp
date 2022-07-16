import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video';
import { Product } from '../models/product';

import { URL_BACKEND } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private urlEndPoint: string = URL_BACKEND+'/api/videos';

  constructor(private http: HttpClient,
    ) { }

  getVideo(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filterProducts(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlEndPoint}/filter-products/${term}`);
  }

  create(video: Video): Observable<Video> {
    return this.http.post<Video>(this.urlEndPoint, video);
  }
}
