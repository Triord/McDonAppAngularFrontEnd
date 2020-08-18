import { Employe } from './../../../Interface/employe';
import { Disponibilite } from './../../../Interface/disponinilite';
import { DisponiniliteService } from './../../../Service/disponinilite.service';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { OrderPipe , OrderModule} from 'ngx-order-pipe';


@Component({
  selector: 'app-disponibilite-list',
  templateUrl: './disponibilite-list.component.html',
  styleUrls: ['./disponibilite-list.component.css']
})
export class DisponibiliteListComponent implements OnInit {
 dispo: Disponibilite[];
 emp: Employe = new Employe() ;
  constructor(private dispoS: DisponiniliteService) { }

  ngOnInit(){
    this.getAllDispo();
  }

  getAllDispo(){

    this.dispoS.getAllDispo().subscribe((reponse: Disponibilite[]) => {
      this.dispo = reponse;
      this.dispo.sort(function(a, b){
        if(a.employee.nom < b.employee.nom ) { return -1; }
        if(a.employee.nom > b.employee.nom) { return 1; }
        return 0;
    })
      console.log("dispo",this.dispo);
      console.log("emp",this.dispo[0]?.employee)

  }
  )};

}
