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
      this.dispo.forEach(d=>{
        if (Number.isInteger(d as unknown as number)) {
          this.dispoS.getOneDispo(d).subscribe((data: any)=>{
            console.log(data)
            this.dispo.push(data);
          })
        }
      })
      this.dispo.sort(function(a, b){
        if(a.employeeFromDisp?.nom < b.employeeFromDisp?.nom ) { return -1; }
        if(a.employeeFromDisp?.nom > b.employeeFromDisp?.nom) { return 1; }
        return 0;
    })
      console.log("dispo",this.dispo);
      console.log("emp",this.dispo[0]?.employeeFromDisp)

    }
  )};
}
