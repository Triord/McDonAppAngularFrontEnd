import { RaisonModif } from './../../../../../Interface/raisonModif';
import { HoraireService } from 'src/app/Service/horaire.service';
import { Employe } from 'src/app/Interface/employe';
import { Component, OnInit } from '@angular/core';
import { Horaire } from 'src/app/Interface/horaire';
import { EmployeeService } from 'src/app/Service/employee.service';
import { parse } from 'path';

@Component({
  selector: 'app-horaire-modif',
  templateUrl: './horaire-modif.component.html',
  styleUrls: ['./horaire-modif.component.css']
})
export class HoraireModifComponent implements OnInit {
  horaire: Horaire;
  employes: Employe[] = [];
  idEmp: number;
  dateSel: string;
  rm: RaisonModif = new RaisonModif();
  constructor(private horS: HoraireService, private empS: EmployeeService) { }

  ngOnInit(){
     this.empS.getAllEmploye().subscribe((data: Employe[])=>{
     this.employes = data;
    });

  }

checkValue(){
  // Set de l id pour la recherche
     const inputEl: HTMLInputElement = document.getElementById('emp') as HTMLInputElement;
     const inputValue: string = inputEl.value;
     const valueSlice = inputValue.slice(0, 4);
     this.idEmp = parseInt(valueSlice, 10);
     console.log('id emp select is',this.idEmp);

  // Set de la date pour la recherche
     const inputEl2: HTMLInputElement = document.getElementById('dt') as HTMLInputElement;
     const inputValue2: string = inputEl2.value;
     this.dateSel = inputValue2;
     console.log('date select is',this.dateSel);

     this.horS.getScheduleForModif(this.dateSel,this.idEmp.toString()).subscribe((data: Horaire)=>{
       this.horaire = data;
       console.log(this.horaire);
     })
     /*
     _______A FAIRE__________
     -FAIRE UNE METHODE OU UNE RAISON DOIT ETRE RENTRER POUR QUE L'HORAIRE' PUISSE ETRE MODIFIER
     -CALL CNTRLLR IN SERVICE
     -TEST MULTIPLE RETURN

     ________________________
     */
}
modifScheduleCompo(){
 // console.log(JSON.stringify(this.horaire));
  let hor: Horaire = new Horaire();
  hor.idHoraire = this.horaire.idHoraire;
  hor.dateJour = this.horaire.dateJour;
  hor.heureDebut = this.horaire.heureDebut;
  hor.heureFin = this.horaire.heureFin;

  hor.heureDebut2 = this.horaire.heureDebut2;
  hor.heureFin2 = this.horaire.heureFin2;
  hor.employee = {
    idEmploye : this.horaire.employee.idEmploye,
    nom: this.horaire.employee.nom,
    prenom: this.horaire.employee.prenom,
    email: this.horaire.employee.email,
    ddn: this.horaire.employee.ddn,
    mdp: this.horaire.employee.mdp,
    nbrHeure: this.horaire.employee.nbrHeure,
    statut: this.horaire.employee.statut,
    dispo: this.horaire.employee.dispo,
    horaire: null,
    semaine: null
  };
  console.log(hor);
  this.horS.modifScheduleServ(hor).subscribe((data)=>{
    alert('Modification effectué cliqué pour continuer');
    location.reload();
  });
}
  saveRaisonModif(){
    this.rm.horaire = this.horaire;
    this.horS.saveModif(this.rm).subscribe((data: any)=>{
      console.log('null')
    });
  }
  removeThisSchedule(){
    this.horaire.statusHoraire = false;
    console.log(this.horaire)
    this.horS.removeThisSchedule(this.horaire).subscribe((data: Horaire) =>{
      console.log(data);
    });
  }
}

