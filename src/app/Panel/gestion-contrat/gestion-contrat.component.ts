import { EmployeeService } from './../../Service/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/Interface/employe';

@Component({
  selector: 'app-gestion-contrat',
  templateUrl: './gestion-contrat.component.html',
  styleUrls: ['./gestion-contrat.component.css']
})
export class GestionContratComponent implements OnInit {
  emp: Employe;
  contrat = 0;
  constructor(private actRoute: ActivatedRoute, private empS: EmployeeService) { }

  ngOnInit(){
    const id = this.actRoute.snapshot.params.id;
    this.empS.getOneEmp(id).subscribe((data: any) =>{
     this.emp = data;
     this.contrat = this.emp.nbrHeure;
    })
  }
  onStudent(){
    this.contrat = 13;
    const employe : Employe = new Employe();
    employe.idEmploye = this.emp.idEmploye;
    employe.nom = this.emp.nom;
    employe.prenom = this.emp.prenom;
    employe.ddn = this.emp.ddn;
    employe.email = this.emp.email;
    employe.mdp = this.emp.mdp;
    employe.nbrHeure = this.contrat;
    employe.statut = this.emp.statut;

    this.empS.changeNbrHeure(employe).subscribe((data: any) => {
      console.log(data);
    });
  }
  onWorker10h(){
    this.contrat = 10;
    const employe : Employe = new Employe();
    employe.idEmploye = this.emp.idEmploye;
    employe.nom = this.emp.nom;
    employe.prenom = this.emp.prenom;
    employe.ddn = this.emp.ddn;
    employe.email = this.emp.email;
    employe.mdp = this.emp.mdp;
    employe.nbrHeure = this.contrat;
    employe.statut = this.emp.statut;

    this.empS.changeNbrHeure(employe).subscribe((data: any) => {
      console.log(data);
    });
  }
  onWorker20h(){
    this.contrat = 20;
    const employe : Employe = new Employe();
    employe.idEmploye = this.emp.idEmploye;
    employe.nom = this.emp.nom;
    employe.prenom = this.emp.prenom;
    employe.ddn = this.emp.ddn;
    employe.email = this.emp.email;
    employe.mdp = this.emp.mdp;
    employe.nbrHeure = this.contrat;
    employe.statut = this.emp.statut;

    this.empS.changeNbrHeure(employe).subscribe((data: any) => {
      console.log(data);
    });
  }
  onWorker28h(){
    this.contrat = 28;
    const employe : Employe = new Employe();
    employe.idEmploye = this.emp.idEmploye;
    employe.nom = this.emp.nom;
    employe.prenom = this.emp.prenom;
    employe.ddn = this.emp.ddn;
    employe.email = this.emp.email;
    employe.mdp = this.emp.mdp;
    employe.nbrHeure = this.contrat;
    employe.statut = this.emp.statut;

    this.empS.changeNbrHeure(employe).subscribe((data: any) => {
      console.log(data);
    });
  }

}
