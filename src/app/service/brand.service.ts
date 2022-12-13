import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Brand} from '../model/brand';

const API_URL = `${environment.api_url}/brands`;

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) {
  }

  getAllBrandOfProject(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${API_URL}`);
  }
  getAllBrandOfCategory(categoryId: number): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${API_URL}/category/${categoryId}`);
  }
}
