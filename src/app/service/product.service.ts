import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {ProductEntity} from '../model/product-entity';

const API_URL = `${environment.api_url}/products`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProductOfProject(offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}?offset=${offset}`);
  }

  getAllProductCategory3OfProject(offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/accessory?offset=${offset}`);
  }

  getAllProductCategory1and2OfProject(offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/alcohol?offset=${offset}`);
  }

  getProductById(productID: number): Observable<ProductEntity> {
    return this.http.get<ProductEntity>(`${API_URL}/${productID}`);
  }

  createNewProductOfProject(product): Observable<Product> {
    return this.http.post<Product>(`${API_URL}`, product);
  }
}
