import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../model/user-token';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {User} from '../model/user';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(sessionStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<any>(API_URL + '/login', {email, password})
      .pipe(map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    sessionStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isLoggedIn() {
    const currentUser = this.getCurrentUser();
    const loggedIn = !!(currentUser);
    return loggedIn;
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  getCurrentUserId() {
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (currentUser == null) {
      return null;
    }
    return currentUser.id;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/register', user);
  }
}
