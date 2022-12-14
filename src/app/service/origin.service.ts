import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Origin} from '../model/origin';
import {OriginDto} from '../model/origin-dto';

const API_URL = `${environment.api_url}/origins`;

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  constructor(private http: HttpClient) {
  }

  getAllOriginOfProject(): Observable<Origin[]> {
    return this.http.get<Origin[]>(`${API_URL}`);
  }

  getAllOriginDTOOfProject(): Observable<OriginDto[]> {
    return this.http.get<OriginDto[]>(`${API_URL}/dto`);
  }

}
