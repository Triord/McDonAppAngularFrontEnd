import { Employe } from './../Interface/employe';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_URL } from '../app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DisponiniliteService {
  private readonly noAuthreqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  public readonly  AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });
  public readonly RootUrl: string = 'http://localhost:9999/';

  constructor(private http: HttpClient) { }

  getAllDispo() {
    return this.http.get(`${API_URL}disponibilite`);
  }
  getAllEmploye(): Observable<Employe>{
    return this.http.get(`${API_URL}employee`) as Observable<Employe>;
  }


}
