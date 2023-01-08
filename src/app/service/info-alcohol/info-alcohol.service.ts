import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {InfoAlcohol} from '../../model/info-alcohol';
import {Observable} from 'rxjs';

const API_URL = `${environment.api_url}/infoAlcohols`;

@Injectable({
  providedIn: 'root'
})
export class InfoAlcoholService {

  constructor(private http: HttpClient) {
  }

  createNewInfoAlcohol(infoAlcohol): Observable<InfoAlcohol> {
    return this.http.post<InfoAlcohol>(`${API_URL}`, infoAlcohol);
  }
}
