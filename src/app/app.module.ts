import { DisponibiliteModifComponent } from './Disponibilite/Disponibilite-Accueil/Disponibilite-Modif/disponibilite-modif.component';
import { AuthenticationService } from './Service/authentication.service';
import { DisponiniliteService } from './Service/disponinilite.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorAuthService } from './Service/httpInterceptorAuth.service';
import { HomeComponent } from './Home/home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DisponibiliteAccueilComponent } from './Disponibilite/Disponibilite-Accueil/Disponibilite-Menu/disponibilite-accueil.component';
import { DisponibiliteListComponent } from './Disponibilite/Disponibilite-Accueil/disponibilite-list/disponibilite-list.component';
import { OrderPipe , OrderModule} from 'ngx-order-pipe';


const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'dispoMenu', component: DisponibiliteAccueilComponent},
  { path: 'dispoList', component: DisponibiliteListComponent},
  { path: 'dispoModif', component: DisponibiliteModifComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DisponibiliteAccueilComponent,
    DisponibiliteListComponent,
    DisponibiliteModifComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NoopAnimationsModule,
    OrderModule
  ],
  providers: [
    DisponiniliteService,
    LoginComponent,
    HomeComponent,
    DisponibiliteAccueilComponent,
    DisponibiliteListComponent,
    DisponibiliteModifComponent,
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorAuthService,
      multi: true
    },

  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
