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

  getAllAccessoryOfProject(offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/accessory?offset=${offset}`);
  }

  getAllAccessoryNoPaginationOfProject(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/all/accessory`);
  }

  getAllAlcoholOfProject(offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/alcohol?offset=${offset}`);
  }

  getAllAlcoholNoPaginationOfProject(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/all/alcohol`);
  }

  getProductById(productID: number): Observable<ProductEntity> {
    return this.http.get<ProductEntity>(`${API_URL}/${productID}`);
  }

  getProductByIdDTO(productID: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/dto/${productID}`);
  }

  getProductByIdDTO1(productID: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/dto1/${productID}`);
  }

  getAllAcoholByOriginId(originId: number, offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/origin/${originId}?offset=${offset}`);
  }

  getAllAlcoholByOriginIdNoPaginationOfProject(originId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/all/origin/${originId}`);
  }

  getAllAlcoholByTypeIdNoPaginationOfProject(typeId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/all/type/${typeId}`);
  }

  getAllAcoholByTypeId(typeId: number, offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/type/${typeId}?offset=${offset}`);
  }

  getAllAccessoryByAccessoryId(accessoryId: number, offset: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/accessory/${accessoryId}?offset=${offset}`);
  }

  createNewProductOfProject(product): Observable<Product> {
    return this.http.post<Product>(`${API_URL}`, product);
  }

  editProductOfProject(productId: number, product): Observable<Product> {
    return this.http.put(`${API_URL}/product/${productId}`, product);
  }

  deleteProductOfProject(productId: number): Observable<Product> {
    return this.http.delete<Product>(`${API_URL}/delete/${productId}`);
  }
}
