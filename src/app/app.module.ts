import { HoraireModifPanelComponent } from './Panel/horaire-modif-panel/horaire-modif-panel.component';
import { VisioEmpPanelComponent } from './Panel/visio-emp-panel/visio-emp-panel.component';

import { HoraireService } from './Service/horaire.service';

import { HoraireMenuComponent } from './Horaire/horaire-menu/Horaire-Menu/HoraireMenu/horaire-menu.component';
import { EmployeeService } from './Service/employee.service';
import { DisponibiliteDetailComponent } from './Disponibilite/Disponibilite-Accueil/Disponibilite-Detail/disponibilite-detail.component';
import { DisponibiliteModifComponent } from './Disponibilite/Disponibilite-Accueil/Disponibilite-Modif/disponibilite-modif.component';
import { AuthenticationService } from './Service/authentication.service';
import { DisponiniliteService } from './Service/disponinilite.service';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
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
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { HoraireModifComponent } from './Horaire/horaire-menu/Horaire-Menu/HoraireModification/horaire-modif/horaire-modif.component';
import { HoraireCreateComponent } from './Horaire/horaire-menu/Horaire-Menu/HoraireCreation/horaire-create/horaire-create.component';
import { HoraireVisioComponent } from './Horaire/horaire-menu/Horaire-Menu/HoraireVisionnage/horaire-visio/horaire-visio.component';
import localeFr from '@angular/common/locales/fr';
import { DatePipe, registerLocaleData } from '@angular/common';
import { DisponibiliteEmployeComponent } from './Disponibilite/Disponibilite-Accueil/Disponibilite-Employe/disponibilite-employe/disponibilite-employe.component';
import { EmployeListComponent } from './Employe/employe-list/employe-list.component';
import { EmployeInfoComponent } from './Employe/employe-info/employe-info.component';
import { PanelListComponent } from './Panel/panel-list/panel-list.component';
registerLocaleData(localeFr);


const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'dispoMenu', component: DisponibiliteAccueilComponent},
  { path: 'dispoList', component: DisponibiliteListComponent},
  { path: 'dispoModif', component: DisponibiliteModifComponent},
  { path: 'dispoDetails/:id', component: DisponibiliteDetailComponent},
  { path: 'horaireMenu', component: HoraireMenuComponent},
  { path: 'horaireVue', component: HoraireVisioComponent},
  { path: 'horaireCreation', component: HoraireCreateComponent},
  { path: 'horaireModification', component: HoraireModifComponent},
  { path: 'dispoThisEmp/:id', component: DisponibiliteEmployeComponent},
  { path: 'employe/list', component: EmployeListComponent},
  { path: 'employe/list/thisEmp/:id', component: EmployeInfoComponent},
  { path: 'admin/panelList', component: PanelListComponent},
  { path: 'admin/panelList/raisonVisioEmpl', component: VisioEmpPanelComponent},
  { path: 'admin/panelList/raisonModifHoraire', component: HoraireModifPanelComponent},
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DisponibiliteAccueilComponent,
    DisponibiliteListComponent,
    DisponibiliteModifComponent,
    DisponibiliteDetailComponent,
    HoraireMenuComponent,
    HoraireModifComponent,
    HoraireCreateComponent,
    HoraireVisioComponent,
    DisponibiliteEmployeComponent,
    EmployeListComponent,
    EmployeInfoComponent,
    PanelListComponent,
    VisioEmpPanelComponent,
    HoraireModifPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
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
    OrderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DisponiniliteService,
    LoginComponent,
    HomeComponent,
    EmployeeService,
    DatePipe,
    HoraireService,
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorAuthService,
      multi: true
    }

  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
