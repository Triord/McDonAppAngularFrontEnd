import { stringify } from 'querystring';
import { element } from 'protractor';
import { DisponiniliteService } from './../../../../../Service/disponinilite.service';
import { Employe } from 'src/app/Interface/employe';
import { HoraireService } from 'src/app/Service/horaire.service';
import { EmployeeService } from './../../../../../Service/employee.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe, Time } from '@angular/common';
import * as moment from 'moment';
import { Horaire } from 'src/app/Interface/horaire';
import { Semaine } from 'src/app/Interface/semaine';
import { Router } from '@angular/router';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Disponibilite } from 'src/app/Interface/disponinilite';
import { parse } from 'path';

@Component({
  selector: 'app-horaire-create',
  templateUrl: './horaire-create.component.html',
  styleUrls: ['./horaire-create.component.css']
})
export class HoraireCreateComponent implements OnInit {
currentUser: string;
  constructor(private empS: EmployeeService, private horS: HoraireService, private datePipe: DatePipe, private router: Router
            , private dispoS: DisponiniliteService) { }
dateSel: Date;
dayDate = new Date() ;
  EndDate = new Date();
  employe: Employe[] = [];
  t: string;
  timeToSubstract: Date = new Date() ;
  timeSubstract: Date = new Date() ;
  resultIs: Date = new Date() ;
  isFree = true;
  isGoodInput = true;
  horaire: Horaire[] = [];
  hor: Horaire = new Horaire();
  lundi: Date;
  mardi: Date;
  mercredi: Date;
  jeudi: Date;
  vendredi: Date;
  samedi: Date;
  dimanche: Date;
  idEmp: number;
  dispo: Disponibilite[] = [];
  disp: Disponibilite;
  verifDisp = true;
  cketuve: number;
  ngOnInit() {

    this.dispoS.getAllDispo().subscribe((data: Disponibilite[]) => {
      this.dispo = data;
      // tslint:disable-next-line: only-arrow-functions
      this.dispo.sort(function(a, b) {
        if (a.employeeFromDisp?.nom < b.employeeFromDisp?.nom ) { return -1; }
        if (a.employeeFromDisp?.nom > b.employeeFromDisp?.nom) { return 1; }
        return 0;
    });
      console.log('LES DISPONIBILITE SONT ', data);
      });
    this.empS.getCurrentUser().subscribe((data: any) => {

      this.currentUser = data;
      console.log(this.currentUser);
    });
    this.empS.getAllEmploye().subscribe((data: any) => {
    this.employe = data;
    this.employe.sort(function(a, b) {
      if (a.nom < b.nom ) { return -1; }
      if (a.nom > b.nom) { return 1; }
      return 0;
  });

    console.log(this.employe);

    });
    this.getScheduleWeek();
  }

  getScheduleWeek() {
    /* test Mon Tue Wed Thu Fri Sat Sun
    this.dayDate = new Date('Tue Sep 29 2020 07:48:32')
    console.log(this.dayDate)*/
    if (this.dayDate.toString().slice(0, 3) === 'Mon') {
      // console.log('date is lundi');
       const t  = new Date(this.dayDate);
       t.setDate(this.dayDate.getDate() + 0);
       this.dayDate = t;
     }
    if (this.dayDate.toString().slice(0, 3) === 'Tue') {
      // console.log('date is mardi');
       const t  = new Date(this.dayDate);
       t.setDate(this.dayDate.getDate() - 1);
       this.dayDate = t;
     }
    if (this.dayDate.toString().slice(0, 3) === 'Wed') {
     // console.log('date is mercredi');
       const t  = new Date(this.dayDate);
       t.setDate(this.dayDate.getDate() - 2);
       this.dayDate = t;
     }
    if (this.dayDate.toString().slice(0, 3) === 'Thu') {
       // console.log('date is jeudi');
       const t  = new Date(this.dayDate);
       t.setDate(this.dayDate.getDate() - 3);
       this.dayDate = t;
     }
    if (this.dayDate.toString().slice(0, 3) === 'Fri') {
      // console.log('date is vendredi');
       const t  = new Date(this.dayDate);
       t.setDate(this.dayDate.getDate() - 4);
       this.dayDate = t;
     }
    if (this.dayDate.toString().slice(0, 3) === 'Sat') {
       // console.log('date is samedi');
       const t  = new Date(this.dayDate);
       t.setDate(this.dayDate.getDate() - 5);
       this.dayDate = t;
     }
    if (this.dayDate.toString().slice(0, 3) === 'Sun') {
     //  console.log('date is dimanche');
       const t  = new Date(this.dayDate);
       t.setDate(this.dayDate.getDate() - 6);
       this.dayDate = t;
     }
     // dayDate est egal ici a la date du lundi de la semaine en cours
     // console.log('daydate is',this.dayDate)
    const date = this.dayDate;
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    this.t = [date.getFullYear(), month, day].join('-');
     // console.log(this.t); // equivaut tjrs a date du lundi
    this.dayDate = moment(this.dayDate).format('YYYY-MM-DD') as unknown as Date;
     // console.log(this.dayDate); // equivaut tjrs a date du lundi
    const endWeek = new Date(this.dayDate); // endweek = date du lundi
    endWeek.setDate(endWeek.getDate() + 6); // endweek set a dimanche
     // console.log('endweek is',endWeek);
    this.EndDate = endWeek; // endDate = date de dimanche
    this.EndDate = moment(this.EndDate).format('YYYY-MM-DD') as unknown as Date;

     // Lundi
    const dateLundi = new Date(this.dayDate);
    dateLundi.setDate(dateLundi.getDate() + 7);
     // Mardi
    const dateMardii = new Date(this.dayDate);
    dateMardii.setDate(dateMardii.getDate() + 8);
     // Mercredi
    const dateMercredi = new Date(this.dayDate);
    dateMercredi.setDate(dateMercredi.getDate() + 9);
     // Jeudi
    const dateJeudi = new Date(this.dayDate);
    dateJeudi.setDate(dateJeudi.getDate() + 10);
     // Vendredi
    const dateVendredi = new Date(this.dayDate);
    dateVendredi.setDate(dateVendredi.getDate() + 11);
     // Samedi
    const dateSamedi = new Date(this.dayDate);
    dateSamedi.setDate(dateSamedi.getDate() + 12);
     // Dimanche
    const dateDimanche = new Date(this.dayDate);
    dateDimanche.setDate(dateDimanche.getDate() + 13);

    this.lundi = dateLundi;
    this.mardi = dateMardii;
    this.mercredi = dateMercredi;
    this.jeudi = dateJeudi;
    this.vendredi = dateVendredi;
    this.samedi = dateSamedi;
    this.dimanche = dateDimanche;

     /*
         TEST VALEUR DES DIFFERENTS JOUR

     console.log('-------------------------------------------------');
     console.log('date de lundi :', dateLundi);
     console.log('date de Mardi :', dateMardii);
     console.log('date de Mercredi :', dateMercredi);
     console.log('date de Jeudi :', dateJeudi);
     console.log('date de Vendredi :', dateVendredi);
     console.log('date de Samedi :', dateSamedi);
     console.log('date de Dimanche :', dateDimanche);
     console.log('-------------------------------------------------');
 */


     // Configuration de la bonne date pour la requete car diff entre date sql et date sortie du back end de 1 jour
    const dateRecherche = new Date(this.dayDate);
    dateRecherche.setDate(dateRecherche.getDate() - 1);
    this.dayDate = dateRecherche;
    this.dayDate = moment(this.dayDate).format('YYYY-MM-DD') as unknown as Date;
     // Fin de la conf

    this.empS.getAllEmploye().subscribe((response: Employe[]) => {
       this.employe = response;
       // tslint:disable-next-line: only-arrow-functions
       this.employe.sort(function(a, b) {
        if (a.nom < b.nom ) { return -1; }
        if (a.nom > b.nom) { return 1; }
        return 0;
    });
// REGLER LE PROBLEME DES HORAIRE QUI NE S AFFICHE PAS

       this.horS.getHoraire(this.dayDate as unknown as string, this.EndDate as unknown as string).subscribe((data: Horaire[]) => {
       this.horaire = data;
       console.log(this.horaire)
       this.employe.forEach(employe => {
         employe.semaine = new Semaine();

       });

       this.horaire.forEach(h => {

        if (typeof h === 'number') {
          // tslint:disable-next-line: no-shadowed-variable
          this.horS.getScheduleById(h).subscribe((data: any) => {
            h = data;
            this.horaire.push(data)
            // initialisation du time de heureDebut
            const hd = h.heureDebut as unknown as string;
            const hdHour = hd.slice(0, 2);
            const hdMin = hd.slice(3, 5);
            const hourHd = parseInt(hdHour, 10);
            const minHd = parseInt(hdMin, 10);

  // initialisation du time de heureFin
            const hf = h.heureFin as unknown as string;
            const hfHour = hf.slice(0, 2);
            const hfMin = hf.slice(3, 5);
            const hourHf = parseInt(hfHour, 10);
            const minHf = parseInt(hfMin, 10);

  // calcul du temps travaillé
            const totalHourTaf = hourHf - hourHd ;
            const totalMinTaf = minHf - minHd ;

            this.timeToSubstract.setHours(hourHf);
            this.timeToSubstract.setMinutes(minHf);
            this.timeToSubstract.setSeconds(0);

            this.timeSubstract.setHours(hourHd);
            this.timeSubstract.setMinutes(minHd);
            this.timeSubstract.setSeconds(0);
            this.resultIs.setHours(this.timeToSubstract.getHours() - this.timeSubstract.getHours()) ;
            this.resultIs.setMinutes(this.timeToSubstract.getMinutes() - this.timeSubstract.getMinutes());
            this.resultIs.setSeconds(0);
           // console.log('le temps additionné est de ',timeAdd,h.idHoraire);
            // console.log('date avec le resultat en heure= ',hourInNumber,h.nbrHeureDay)
           // affichage des horaire mappé par spring console.log('horaire hash is',h);
            this.employe.find(employe => employe?.idEmploye === h.employeeFromHoraire?.idEmploye).horaire.push(h);

            h.dateJour = moment(h.dateJour).format('YYYY-MM-DD') as unknown as Date;
            this.lundi = moment(this.lundi).format('YYYY-MM-DD') as unknown as Date;
            this.mardi = moment(this.mardi).format('YYYY-MM-DD') as unknown as Date;
            this.mercredi = moment(this.mercredi).format('YYYY-MM-DD') as unknown as Date;
            this.jeudi = moment(this.jeudi).format('YYYY-MM-DD') as unknown as Date;
            this.vendredi = moment(this.vendredi).format('YYYY-MM-DD') as unknown as Date;
            this.samedi = moment(this.samedi).format('YYYY-MM-DD') as unknown as Date;
            this.dimanche = moment(this.dimanche).format('YYYY-MM-DD') as unknown as Date;
            h.nbrHeureDay =  this.resultIs.toString().slice(17, 18);
            h.heureCalculer = Number(h.nbrHeureDay);
            h.minuteCalculer = Number(this.resultIs.toString().slice(19, 21));


            if (h.dateJour === this.lundi) {
              this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.lundi = h;

          }
            if (h.dateJour === this.mardi) {
              this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.mardi = h;
          }
            if (h.dateJour === this.mercredi) {

              this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.mercredi = h;
          }
            if (h.dateJour === this.jeudi) {
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.jeudi = h;
          }
            if (h.dateJour === this.vendredi) {
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.vendredi = h;
          }
            if (h.dateJour === this.samedi) {
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.samedi = h;
          }
            if (h.dateJour === this.dimanche) {
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.dimanche = h;
          }




         // this.employe.find(employe => employe.idEmploye === h.employee.idEmploye).semaine

        });



        }

        if (typeof h !== 'number') {
            this.horaire.push(h)
          // tslint:disable-next-line: no-shadowed-variable

            // initialisation du time de heureDebut
            const hd = h.heureDebut as unknown as string;
            const hdHour = hd.slice(0, 2);
            const hdMin = hd.slice(3, 5);
            const hourHd = parseInt(hdHour, 10);
            const minHd = parseInt(hdMin, 10);

  // initialisation du time de heureFin
            const hf = h.heureFin as unknown as string;
            const hfHour = hf.slice(0, 2);
            const hfMin = hf.slice(3, 5);
            const hourHf = parseInt(hfHour, 10);
            const minHf = parseInt(hfMin, 10);

  // calcul du temps travaillé
            const totalHourTaf = hourHf - hourHd ;
            const totalMinTaf = minHf - minHd ;

            this.timeToSubstract.setHours(hourHf);
            this.timeToSubstract.setMinutes(minHf);
            this.timeToSubstract.setSeconds(0);

            this.timeSubstract.setHours(hourHd);
            this.timeSubstract.setMinutes(minHd);
            this.timeSubstract.setSeconds(0);
            this.resultIs.setHours(this.timeToSubstract.getHours() - this.timeSubstract.getHours()) ;
            this.resultIs.setMinutes(this.timeToSubstract.getMinutes() - this.timeSubstract.getMinutes());
            this.resultIs.setSeconds(0);
           // console.log('le temps additionné est de ',timeAdd,h.idHoraire);
            // console.log('date avec le resultat en heure= ',hourInNumber,h.nbrHeureDay)
           // affichage des horaire mappé par spring console.log('horaire hash is',h);

            h.dateJour = moment(h.dateJour).format('YYYY-MM-DD') as unknown as Date;
            this.lundi = moment(this.lundi).format('YYYY-MM-DD') as unknown as Date;
            this.mardi = moment(this.mardi).format('YYYY-MM-DD') as unknown as Date;
            this.mercredi = moment(this.mercredi).format('YYYY-MM-DD') as unknown as Date;
            this.jeudi = moment(this.jeudi).format('YYYY-MM-DD') as unknown as Date;
            this.vendredi = moment(this.vendredi).format('YYYY-MM-DD') as unknown as Date;
            this.samedi = moment(this.samedi).format('YYYY-MM-DD') as unknown as Date;
            this.dimanche = moment(this.dimanche).format('YYYY-MM-DD') as unknown as Date;
            h.nbrHeureDay =  this.resultIs.toString().slice(17, 18);
            h.heureCalculer = Number(h.nbrHeureDay);
            h.minuteCalculer = Number(this.resultIs.toString().slice(19, 21));


            if (h.dateJour === this.lundi) {
         this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.lundi = h;
         console.log(this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.lundi);
       }
            if (h.dateJour === this.mardi) {
         this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.mardi = h;
       }
            if (h.dateJour === this.mercredi) {
         this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.mercredi = h;
       }
            if (h.dateJour === this.jeudi) {
         this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.jeudi = h;
       }
            if (h.dateJour === this.vendredi) {
         this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.vendredi = h;
       }
            if (h.dateJour === this.samedi) {
         this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.samedi = h;
       }
            if (h.dateJour === this.dimanche) {
         this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.dimanche = h;
       }


      }


     });
       console.log(this.horaire)



       console.log(this.employe);
       this.employe.forEach(emp => {
        console.log(emp.semaine);



   });
    });

     });

  }
reloadComponent() {
  location.reload();
}
 showData() {
   console.log(this.hor);
 }
 createSchedule() {
  const DateHorCreate: Date = new Date(this.hor.dateJour);
  const inputElement: HTMLInputElement = document.getElementById('sel') as HTMLInputElement;
  const inputValue: string = inputElement.value;
  const id: string = inputValue.slice(0, 4);
  const idUserCreate: string = inputValue.slice(0, 4);
  const idUC: number = parseInt(idUserCreate, 10);

  console.log(id);
  this.idEmp = parseInt(id);
  console.log('this idemp =', this.idEmp);
  this.empS.getEmpSelect(this.idEmp).subscribe((data: Employe) => {
   //  console.log(data);
    this.hor.employeeFromHoraire = data;
    if (this.hor.dateJour < this.lundi) {
      console.log('erreur impossible de creer un horaire pour le passé');
    }
    // tslint:disable-next-line: no-shadowed-variable
    this.dispoS.getDispInHor(idUC).subscribe((data: Disponibilite) => {
      this.disp = data;
      console.log('les disp de l utilisateur selectionne sont', this.disp);
      if (DateHorCreate.toString().slice(0, 3) === 'Mon') {
      console.log('date is lundi');
      if (this.hor?.heureDebut < this.disp?.lundi || this.hor?.heureFin > this.disp?.lundi2 ||
        this.hor?.heureDebut2 < this.disp?.lundi || this.hor?.heureFin2 > this.disp?.lundi2 ) {
      this.verifDisp = false;

    } else {
      this.verifDisp = true;
    }
     }
      if (DateHorCreate.toString().slice(0, 3) === 'Tue') {
       console.log('date is mardi');
       if (this.hor?.heureDebut < this.disp?.mardi || this.hor?.heureFin > this.disp?.mardi2 ||
        this.hor?.heureDebut2 < this.disp?.mardi || this.hor?.heureFin2 > this.disp?.mardi2 ) {
      this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
     }
      if (DateHorCreate.toString().slice(0, 3) === 'Wed') {
      console.log('date is mercredi');
      if (this.hor?.heureDebut < this.disp?.mercredi || this.hor?.heureFin > this.disp?.mercredi2 ||
        this.hor?.heureDebut2 < this.disp?.mercredi || this.hor?.heureFin2 > this.disp?.mercredi2 ) {
      this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
     }
      if (DateHorCreate.toString().slice(0, 3) === 'Thu') {
        console.log('date is jeudi');
        if (this.hor?.heureDebut < this.disp?.jeudi || this.hor?.heureFin > this.disp?.jeudi2 ||
          this.hor?.heureDebut2 < this.disp?.jeudi || this.hor?.heureFin2 > this.disp?.jeudi2 ) {
        this.verifDisp = false;
      } else {
        this.verifDisp = true;
      }
     }
      if (DateHorCreate.toString().slice(0, 3) === 'Fri') {
       console.log('date is vendredi');
       if (this.hor?.heureDebut < this.disp?.vendredi || this.hor?.heureFin > this.disp?.vendredi2 ||
        this.hor?.heureDebut2 < this.disp?.vendredi || this.hor?.heureFin2 > this.disp?.vendredi2 ) {
      this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
     }
      if (DateHorCreate.toString().slice(0, 3) === 'Sat') {
        console.log('date is samedi');
        if (this.hor?.heureDebut < this.disp?.samedi || this.hor?.heureFin > this.disp?.samedi2 ||
          this.hor?.heureDebut2 < this.disp?.samedi || this.hor?.heureFin2 > this.disp?.samedi2 ) {
        this.verifDisp = false;
      } else {
        this.verifDisp = true;
      }
     }
      if (DateHorCreate.toString().slice(0, 3) === 'Sun') {
      console.log('date is dimanche');
      if (this.hor?.heureDebut < this.disp?.dimanche || this.hor?.heureFin > this.disp?.dimanche2 ||
        this.hor?.heureDebut2 < this.disp?.dimanche || this.hor?.heureFin2 > this.disp?.dimanche2 ) {
      this.verifDisp = false;
    } else {
      this.verifDisp = true;
    }
     }
      if (this.verifDisp) {
        const horr: Horaire = new Horaire();
        horr.idHoraire = this.hor.idHoraire;
        horr.dateJour = this.hor.dateJour;
        horr.heureDebut = this.hor.heureDebut;
        horr.heureFin = this.hor.heureFin;
        horr.heureDebut2 = this.hor.heureDebut2;
        horr.heureFin2 = this.hor.heureFin2;
        horr.employeeFromHoraire = {
          idEmploye : this.hor.employeeFromHoraire.idEmploye,
          nom: this.hor.employeeFromHoraire.nom,
          prenom: this.hor.employeeFromHoraire.prenom,
          email: this.hor.employeeFromHoraire.email,
          ddn: this.hor.employeeFromHoraire.ddn,
          numTel: this.hor.employeeFromHoraire.numTel,
          mdp: this.hor.employeeFromHoraire.mdp,
          nbrHeure: this.hor.employeeFromHoraire.nbrHeure,
          statut: this.hor.employeeFromHoraire.statut,
          dispo: this.hor.employeeFromHoraire.dispo,
          horaire: null,
          semaine: null
        };
        // tslint:disable-next-line: no-shadowed-variable
        this.horS.addSchedule(horr).subscribe((data: Horaire) => {
      console.log(data);


    });

    }
  });
});

 }
 checkHour() {
  const DateHorCreate: Date = new Date(this.hor.dateJour);
  console.log(DateHorCreate);

  const inputElement: HTMLInputElement = document.getElementById('sel') as HTMLInputElement;
  const inputValue: string = inputElement.value;
  const idUserCreate: string = inputValue.slice(0, 4);
  const idUC: number = parseInt(idUserCreate, 10);
  this.timeToSubstract.setHours(0);
  console.log(this.timeToSubstract.getHours());
// initialisation du time de heureDebut
  const elementt: HTMLInputElement = document.getElementById('hd') as HTMLInputElement;
  const hd: string = elementt.value;
  const hdHour = hd.slice(0, 2);
  const hdMin = hd.slice(3, 5);
  const hourHd = parseInt(hdHour, 10);
  const minHd = parseInt(hdMin, 10);
  console.log(hd, 'est egal a ', hourHd, ':', minHd);

  // initialisation du time de heureFin
  const element2: HTMLInputElement = document.getElementById('hf') as HTMLInputElement;
  const hf: string = element2.value;
  const hfHour = hf.slice(0, 2);
  const hfMin = hf.slice(3, 5);
  const hourHf = parseInt(hfHour, 10);
  const minHf = parseInt(hfMin, 10);
  console.log(hf, 'est egal a ', hourHf, ':', minHf);

  // calcul du temps travaillé
  const totalHourTaf = hourHf - hourHd ;
  const totalMinTaf = minHf - minHd ;
  console.log('lutilisateur a travailler', totalHourTaf, ':', totalMinTaf);

  this.timeToSubstract.setHours(hourHf);
  this.timeToSubstract.setMinutes(minHf);
  this.timeToSubstract.setSeconds(0);

  this.timeSubstract.setHours(hourHd);
  this.timeSubstract.setMinutes(minHd);
  this.timeSubstract.setSeconds(0);
  this.resultIs.setHours(this.timeToSubstract.getHours() - this.timeSubstract.getHours()) ;
  this.resultIs.setMinutes(this.timeToSubstract.getMinutes() - this.timeSubstract.getMinutes());
  this.resultIs.setSeconds(0);
  console.log(this.resultIs);
 }

}
