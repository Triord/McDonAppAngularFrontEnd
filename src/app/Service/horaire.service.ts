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
  public readonly RootUrl: string = 'http://localhost:9999/';


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
      console.log(JSON.stringify(horaire));
      return this.http.post<Horaire>(`${API_URL}createSchedule`, horaire);
  }
  getScheduleById(id: any){
    return this.http.get(`${API_URL}horaireById/${id}`);
  }
}
