import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
const API_URL = `${environment.api_url}/products`;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createNewProductOfProject(product): Observable<Product> {
    return this.http.post<Product>(`${API_URL}`, product);
  }
}
