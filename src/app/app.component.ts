import { AuthenticationService } from './Service/authentication.service';
import { HomeComponent } from './Home/home/home.component';
import { HttpInterceptorAuthService } from './Service/httpInterceptorAuth.service';
import { LoginComponent } from './Login/login/login.component';
import { Component, OnInit } from '@angular/core';
import { HttpHandler, HttpRequest } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'McDonApp';
l: boolean = false;
username: string;
active='top';
  constructor(private auth: AuthenticationService, private logou: LoginComponent , private router: Router){}



  ngOnInit() {
   console.log("le log"+this.authenticated);
   this.username =  this.auth.getAuthenticatedUser();
   console.log(this.username)
  }
  logout(){
    this.logou.logout();
    this.l = false;
    this.router.navigate(['/login']);
  }
 public get authenticated(): boolean {

      return this.auth.isUserLoggedIn();


  }

}

