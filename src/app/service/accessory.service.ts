import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Accessory} from '../model/accessory';
import {AccessoryDto} from '../model/accessory-dto';

const API_URL = `${environment.api_url}/accessories`;

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  constructor(private http: HttpClient) {
  }

  getAllAccessoryOfProject(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(`${API_URL}`);
  }
  getAllAccessoryDTOOfProject(): Observable<AccessoryDto[]> {
    return this.http.get<AccessoryDto[]>(`${API_URL}/dto`);
  }
}
