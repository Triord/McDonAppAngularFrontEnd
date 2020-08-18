import { AuthenticationService } from './../../Service/authentication.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login;
  token;
  logged = false;


  loginForm = this.fb.group({
    mail: [],
    password: []
  });


  constructor(private fb: FormBuilder, private authService: AuthenticationService , private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.executeJWTAuthenticationService(this.loginForm.value.mail, this.loginForm.value.password).subscribe(
      response => {
        this.login = this.authService.getAuthenticatedUser();
        this.token = this.authService.getAuthenticatedToken();
        this.logged = true;
        this.router.navigate(['/home']);
      }
    );
  }
  logout() {
    this.authService.logout();
    this.login = this.authService.getAuthenticatedUser();
    this.token = this.authService.getAuthenticatedToken();
    this.logged = false;

  }
  reload(){
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }
}
