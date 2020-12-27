import { DisponiniliteService } from './disponinilite.service';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUSer';
const USER_ROLE = 'auth-role';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private dispoService: DisponiniliteService) { }
  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }
  getAuthenticatedToken() {
    return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
  getRole(){

      let jwt = sessionStorage.getItem(TOKEN)

      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)


     // console.log('jwtData: ' + jwtData)
     // console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
     // console.log('decodedJwtData: ' + decodedJwtData)
      const obj = JSON.parse(decodedJwtJsonData);
      const role = obj.role.slice(5);
     // console.log(role)
      return role;
  }

  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(
    this.dispoService.RootUrl + `authenticate`, {
    username,
    password}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }
}
