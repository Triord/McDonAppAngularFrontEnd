import { Disponibilite } from './../Interface/disponinilite';
import { Employe } from './../Interface/employe';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../app.constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly noAuthreqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  public readonly  AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });
  public readonly RootUrl: string = 'http://localhost:9999/';

  constructor(private http: HttpClient) { }

  getAllEmploye(): Observable<Employe[]>{
    return this.http.get<Employe[]>(`${API_URL}employee`);
  }
  getCurrentUser() {
    return this.http.get(`${API_URL}currentUser`,{responseType:'text'});
  }
  getEmpSelect(id: any){
    const params = new HttpParams()
    .set('id', id);
    return this.http.get<Employe>(`${API_URL}empForSchedule`, {params});
  }

}
