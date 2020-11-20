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
  getOneEmp(id:any){
    return this.http.get(`${API_URL}employeOnId/${id}`);
  }
  getOneVisioEmp(id:any){
    return this.http.get(`${API_URL}allVisioDone/${id}`);
  }
  saveRaisonViewedEmp(ve){
    return this.http.post(`${API_URL}saveRaisonView`, ve);
  }
  allViewDone(){
    return this.http.get(`${API_URL}allVisioDone`);
  }
  getTestMethod2(idEmp: any){
    const params = new HttpParams()
    .set('idEmp', idEmp);
    return this.http.get(`${API_URL}testMethod2`,{params});
  }
  beAChief(idEmp: any){
    const params = new HttpParams()
    .set('idEmp', idEmp);
    return this.http.get(`${API_URL}beAChief`,{params});
  }
  beAMana(idEmp: any){
    const params = new HttpParams()
    .set('idEmp', idEmp);
    return this.http.get(`${API_URL}beAManager`,{params});
  }
  beAWorker(idEmp: any){
    const params = new HttpParams()
    .set('idEmp', idEmp);
    return this.http.get(`${API_URL}beAWorker`,{params});
  }
  beAStudent(idEmp: any){
    const params = new HttpParams()
    .set('idEmp', idEmp);
    return this.http.get(`${API_URL}beAStudent`,{params});
  }
  changeNbrHeure(employe){
    return this.http.put(`${API_URL}changeNbrHeure`, employe);
  }
  allConge(){
    return this.http.get(`${API_URL}allConge`);
  }
  acceptConge(con){
    return this.http.put(`${API_URL}acceptConge`, con);
  }
  unacceptConge(con){
    return this.http.put(`${API_URL}unacceptConge`, con);
  }
  getOneConge(id:any){
    return this.http.get(`${API_URL}oneConge/${id}`);
  }
}
