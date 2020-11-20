import { EmployeeService } from 'src/app/Service/employee.service';
import { Component, OnInit } from '@angular/core';
import { Conge } from 'src/app/Interface/Conge';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {
  conges: Conge[];
  statusC = null;
  con: Conge[];
  constructor(private empS: EmployeeService) { }

  ngOnInit(){
    this.empS.allConge().subscribe((data: Conge[]) =>{
      this.conges = data;
      console.log(this.conges)
      this.conges.forEach(c => {

        if (Number.isInteger(c as unknown as number)) {
          this.empS.getOneConge(c).subscribe((data2: any) => {
            this.conges.push(data2);
          })
        }
      });
    })

  }

  onClikAccept(event, conge: Conge){
    const c: Conge = new Conge();
    c.idConge = conge.idConge;
    c.dateConge = conge.dateConge;
    c.raison = conge.raison;
    c.statusConge = conge.statusConge;
    c.employeeFromConge = {
      idEmploye : conge.employeeFromConge.idEmploye,
      nom: conge.employeeFromConge.nom,
      prenom: conge.employeeFromConge.prenom,
      email: conge.employeeFromConge.email,
      ddn: conge.employeeFromConge.ddn,
      mdp: conge.employeeFromConge.mdp,
      nbrHeure: conge.employeeFromConge.nbrHeure,
      statut: conge.employeeFromConge.statut,
      dispo: null,
      horaire: null,
      semaine: null
    };
    this.empS.acceptConge(c).subscribe((data: any)=>{
      console.log(data);
      conge.statusConge = true;
    })
 }
 onClikUnaccept(event, conge: Conge){
  const c: Conge = new Conge();
  c.idConge = conge.idConge;
  c.dateConge = conge.dateConge;
  c.raison = conge.raison;
  c.statusConge = conge.statusConge;
  c.employeeFromConge = {
    idEmploye : conge.employeeFromConge.idEmploye,
    nom: conge.employeeFromConge.nom,
    prenom: conge.employeeFromConge.prenom,
    email: conge.employeeFromConge.email,
    ddn: conge.employeeFromConge.ddn,
    mdp: conge.employeeFromConge.mdp,
    nbrHeure: conge.employeeFromConge.nbrHeure,
    statut: conge.employeeFromConge.statut,
    dispo: null,
    horaire: null,
    semaine: null
  };
  this.empS.unacceptConge(c).subscribe((data: any)=>{
    console.log(data);
    conge.statusConge = false;
  })
}

}
