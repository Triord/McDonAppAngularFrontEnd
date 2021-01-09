import { DisponiniliteService } from './../../../../../Service/disponinilite.service';
import { RaisonModif } from './../../../../../Interface/raisonModif';
import { HoraireService } from 'src/app/Service/horaire.service';
import { Employe } from 'src/app/Interface/employe';
import { Component, OnInit } from '@angular/core';
import { Horaire } from 'src/app/Interface/horaire';
import { EmployeeService } from 'src/app/Service/employee.service';
import { parse } from 'path';
import { Disponibilite } from 'src/app/Interface/disponinilite';

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
  disp: Disponibilite = new Disponibilite();
  verifDisp: boolean = true;
  constructor(private horS: HoraireService, private empS: EmployeeService, private dispS: DisponiniliteService) { }

  ngOnInit(){
     this.empS.getAllEmploye().subscribe((data: Employe[])=>{
     this.employes = data;
     this.employes.forEach(em => {
        if (typeof em ==='number') {
          this.empS.getOneEmp(em).subscribe((data2: any) => {
            this.employes.push(data2);
          })
        }
      });
     console.log(this.employes)//j en suis au moment ou il faut afficher les employe manquant dans la liste
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
  hor.employeeFromHoraire = {
    idEmploye : this.horaire.employeeFromHoraire.idEmploye,
    nom: this.horaire.employeeFromHoraire.nom,
    prenom: this.horaire.employeeFromHoraire.prenom,
    email: this.horaire.employeeFromHoraire.email,
    ddn: this.horaire.employeeFromHoraire.ddn,
    mdp: this.horaire.employeeFromHoraire.mdp,
    numTel: this.horaire.employeeFromHoraire.numTel,
    nbrHeure: this.horaire.employeeFromHoraire.nbrHeure,
    statut: this.horaire.employeeFromHoraire.statut,
    dispo: this.horaire.employeeFromHoraire.dispo,
    horaire: null,
    semaine: null
  };
  // console.log(hor.employee.nom);
  this.dispS.getDispInHor(hor.employeeFromHoraire.idEmploye).subscribe((data: any) => {
    console.log(data);
    this.disp = data;
    const dateOfSchedule = new Date(hor.dateJour);
    if (dateOfSchedule.toString().slice(0, 3) === 'Mon') {
      console.log('date is lundi');
      if (hor.heureDebut < this.disp?.lundi || hor.heureFin > this.disp?.lundi2 ||
        hor.heureDebut2 < this.disp?.lundi || hor.heureFin2 > this.disp?.lundi2 ) {
        this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
    }
    if (dateOfSchedule.toString().slice(0, 3) === 'Tue') {
      console.log('date is mardi');
      if (hor.heureDebut < this.disp?.mardi || hor.heureFin > this.disp?.mardi2 ||
        hor.heureDebut2 < this.disp?.mardi || hor.heureFin2 > this.disp?.mardi2 ) {
        this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
    }
    if (dateOfSchedule.toString().slice(0, 3) === 'Wed') {
      console.log('date is mercredi');
      if (hor.heureDebut < this.disp?.mercredi || hor.heureFin > this.disp?.mercredi2 ||
        hor.heureDebut2 < this.disp?.mercredi || hor.heureFin2 > this.disp?.mercredi2 ) {
        this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
    }
    if (dateOfSchedule.toString().slice(0, 3) === 'Thu') {
      console.log('date is jeudi');
      if (hor.heureDebut < this.disp?.jeudi || hor.heureFin > this.disp?.jeudi2 ||
        hor.heureDebut2 < this.disp?.jeudi || hor.heureFin2 > this.disp?.jeudi2 ) {
        this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
    }
    if (dateOfSchedule.toString().slice(0, 3) === 'Fri') {
      console.log('date is vendredi');
      if (hor.heureDebut < this.disp?.vendredi || hor.heureFin > this.disp?.vendredi2 ||
        hor.heureDebut2 < this.disp?.vendredi || hor.heureFin2 > this.disp?.vendredi2 ) {
        this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
    }
    if (dateOfSchedule.toString().slice(0, 3) === 'Sat') {
      console.log('date is lundi');
      if (hor.heureDebut < this.disp?.samedi || hor.heureFin > this.disp?.samedi2 ||
        hor.heureDebut2 < this.disp?.samedi || hor.heureFin2 > this.disp?.samedi2 ) {
        this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
    }
    if (dateOfSchedule.toString().slice(0, 3) === 'Sun') {
      console.log('date is lundi');
      if (hor.heureDebut < this.disp?.dimanche || hor.heureFin > this.disp?.dimanche2 ||
        hor.heureDebut2 < this.disp?.dimanche || hor.heureFin2 > this.disp?.dimanche2 ) {
        this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
    }
    console.log(hor)
    if (this.verifDisp) {
      this.horS.modifScheduleServ(hor).subscribe(( data ) => {
        console.log(data)
    alert('Modification effectué cliqué pour continuer');
    location.reload();
  });
    }
  });
}
  saveRaisonModif(){
    console.log(this.horaire.employeeFromHoraire.idEmploye)

    this.rm.horaire = this.horaire;
    let rmTemp: RaisonModif = new RaisonModif();
    rmTemp.raison = this.rm.raison;
    rmTemp.horaire = {
      idHoraire: this.horaire.idHoraire,
      dateJour: this.horaire.dateJour,
      heureDebut : this.horaire.heureDebut,
      heureFin : this.horaire.heureFin,
      heureDebut2: this.horaire.heureDebut2,
      heureFin2: this.horaire.heureFin2,
      employeeFromHoraire: null,
      createBy: null,
      modifBy: null,
      nbrHeureDay: null,
      heureCalculer: null,
      minuteCalculer: null,
      rm:null,
      statusHoraire: true
    };
    rmTemp.employeFromRM ={
      idEmploye : this.horaire.employeeFromHoraire.idEmploye,
      nom: this.horaire.employeeFromHoraire.nom,
      prenom: this.horaire.employeeFromHoraire.prenom,
      email: this.horaire.employeeFromHoraire.email,
      ddn: this.horaire.employeeFromHoraire.ddn,
      mdp: this.horaire.employeeFromHoraire.mdp,
      numTel : this.horaire.employeeFromHoraire.numTel,
      nbrHeure: this.horaire.employeeFromHoraire.nbrHeure,
      statut: this.horaire.employeeFromHoraire.statut,
      dispo: this.horaire.employeeFromHoraire.dispo,
      horaire: null,
      semaine: null
      }
      console.log(rmTemp)
    this.horS.saveModif(rmTemp).subscribe((data: any)=>{
      console.log(data)
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

