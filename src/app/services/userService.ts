import {environment} from '../../environments/environment';
// import jwt_decode();
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {HttpClient} from '@angular/common/http';
import {Organisation} from '../Models/Organisation.interface';
import {User} from '../Models/User';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {types} from 'util';
import jwtDecode from 'jwt-decode';

export interface AuthResp {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  role: string;
  token: string;
}

@Injectable({
    providedIn: 'root'
  }
)
export class UserService {

  private apiUrl = environment.api;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getUsers() {
    return this.httpClient.get<Array<User>>(this.apiUrl + 'Users');
  }

  getUser(id: any) {
    return this.httpClient.get<User>(this.apiUrl + 'User/' + id);
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'Save', data);
  }

  signin(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'Authenticate', data);
  }

   authHandler(crd: AuthResp) {
    const expiresIn = (jwtDecode(crd.token) as JwtPayload).exp;
    console.log(expiresIn);
    const expirationDate = new Date(expiresIn * 1000);
    const user = new User(crd.id, crd.firstName, crd.lastName, crd.emailAddress, crd.role, crd.token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

  }

  autoLogout(exp: number) {
    const expTime = exp - new Date().getTime();
    //const testExpTime = 120000;
    console.log("Auto logout at: " + expTime);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expTime);
  }

  logout() {
    this.httpClient.delete(this.apiUrl + 'user/logout').pipe(tap(() =>
    {
      this.user.next(null);
      this.router.navigate(['/login']);
      localStorage.removeItem('userData');
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    }
  )).
    subscribe();

  }

  autoLogin() {
    const userData: {
      id: number,
      firstName: string,
      lastName: string,
      emailAddress: string,
      role: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.lastName,
      userData.firstName,
      userData.emailAddress,
      userData.role,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.router.navigate(['/userpage/:id']);
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

}

