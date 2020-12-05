import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private readonly noAuthreqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  public readonly  AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });
  public readonly RootUrl: string = 'http://127.0.0.1:9999/';
  constructor(private http: HttpClient, private datepipe: DatePipe) { }


  getAllForumNews(){
    return this.http.get(`${API_URL}getForumNews`);
  }

  getOneNews(id:any){
    return this.http.get(`${API_URL}oneNews/${id}`);
  }
  addForumNews(forum){
    return this.http.post(`${API_URL}addForumNews`, forum);
  }
}
