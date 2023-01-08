import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Invoice} from '../../model/invoice';
import {QuantityProductCart} from '../../model/quantity-product-cart';

const API_URL = `${environment.api_url}/carts`;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  getInvoiceOfUser(userId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${API_URL}/user/${userId}`);
  }
  createNewCart(cart): Observable<any> {
    return this.http.post(`${API_URL}`, cart);
  }
  updateQuantity(invoice): Observable<Invoice> {
    return this.http.put(`${API_URL}/updateQuantity`, invoice);
  }
  deleteCart(cartId: number): Observable<any> {
    return this.http.delete(`${API_URL}/cart/${cartId}`);
  }
}
