import { DisponiniliteService } from './../../../Service/disponinilite.service';
import { Component, OnInit } from '@angular/core';
import { Disponibilite } from 'src/app/Interface/disponinilite';

@Component({
  selector: 'app-disponibilite-modif',
  templateUrl: './disponibilite-modif.component.html',
  styleUrls: ['./disponibilite-modif.component.css']
})
export class DisponibiliteModifComponent implements OnInit {
  dispo: Disponibilite[];
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
