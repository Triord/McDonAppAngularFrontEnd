import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { Horaire } from '../Interface/horaire';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HoraireService {
  private readonly noAuthreqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  public readonly  AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });
  public readonly RootUrl: string = 'http://127.0.0.1:9999/';


  constructor(private http: HttpClient, private datepipe: DatePipe) { }


  getAllHoraire(): Observable<Horaire[]>{
    return this.http.get<Horaire[]>(`${API_URL}horaire`);
  }
  getHoraire(dateIn: string , dateOut: string): Observable<Horaire[]> {
    const params = new HttpParams()
    .set('dateIn', dateIn)
    .set('dateOut', dateOut);
    return this.http.get<Horaire[]>(`${API_URL}horaireWent`, {params});
  }
  addSchedule(horaire){
      return this.http.post(`${API_URL}createSchedule`, horaire);
  }
  modifScheduleServ(horaire){
    return this.http.put(`${API_URL}modifSchedule`, horaire );
  }
  getScheduleById(id: any){
    return this.http.get(`${API_URL}horaireById/${id}`);
  }
  getScheduleForModif(dateForModif: string, idEmpForModif: string){
    const params = new HttpParams()
    .set('dateForModif', dateForModif)
    .set('idEmpForModif', idEmpForModif);
    return this.http.get(`${this.RootUrl}modifThis`,{params});
  }
  saveModif(rm){
    return this.http.post(`${API_URL}saveModif`, rm);
  }
  getAllModifDone(){
    return this.http.get(`${API_URL}getModifDone`);
  }
  getModifById(id: any){
    return this.http.get(`${API_URL}getModifById/${id}`);
  }
  removeThisSchedule(horaire){
    return this.http.put(`${API_URL}removeThisSchedule`, horaire);
  }
}
