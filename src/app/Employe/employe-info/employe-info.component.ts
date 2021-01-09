import { ViewEmploye } from './../../Interface/viewEmploye';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../../Service/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/Interface/employe';

@Component({
  selector: 'app-employe-info',
  templateUrl: './employe-info.component.html',
  styleUrls: ['./employe-info.component.css']
})
export class EmployeInfoComponent implements OnInit {
  employe: Employe;
  ve: ViewEmploye = new ViewEmploye();
  isSend = false;
  constructor(private empS: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.empS.getOneEmp(id).subscribe((data: Employe) => {
      this.employe = data;
      console.log(this.employe)
    });
  }
  submitRaison(){
    this.ve.employeView = this.employe;
    let v : ViewEmploye = new ViewEmploye();
    v.raisonView = this.ve.raisonView;
    v.employeView ={
      idEmploye : this.employe.idEmploye,
      nom: this.employe.nom,
      prenom: this.employe.prenom,
      email: this.employe.email,
      ddn: this.employe.ddn,
      mdp: this.employe.mdp,
      nbrHeure: this.employe.nbrHeure,
      statut: this.employe.statut,
      dispo: null,
      numTel: this.employe.numTel,
      horaire: null,
      semaine: null
    }
    console.log(v);
    this.empS.saveRaisonViewedEmp(v).subscribe((data: any) => {
      console.log(v);
    });
    this.isSend = true;
  }

}
