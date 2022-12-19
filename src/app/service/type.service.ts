import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Type} from '../model/type';

const API_URL = `${environment.api_url}/types`;

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  getAllTypeOfProject(): Observable<Type[]> {
    return this.http.get<Type[]>(`${API_URL}`);
  }
}
