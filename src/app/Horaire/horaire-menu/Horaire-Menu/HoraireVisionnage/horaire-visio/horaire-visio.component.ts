import { EmployeeService } from './../../../../../Service/employee.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Horaire } from 'src/app/Interface/horaire';
import { Objet } from 'src/app/Interface/objet';
import { HoraireService } from 'src/app/Service/horaire.service';
import * as moment from 'moment';
import { Employe } from 'src/app/Interface/employe';
import { Semaine } from 'src/app/Interface/semaine';

@Component({
  selector: 'app-horaire-visio',
  templateUrl: './horaire-visio.component.html',
  styleUrls: ['./horaire-visio.component.css']
})
export class HoraireVisioComponent implements OnInit {
  horaire: Horaire[]=[];
  dateDe: string;
  lundi: Date;
  mardi: Date;
  mercredi: Date;
  jeudi: Date;
  vendredi: Date;
  samedi: Date;
  dimanche: Date;
  dateA: string;
  dateIn: string;
  dateOut: string;
  employe:Employe[]=[];

  constructor(private horS: HoraireService, private datepipe: DatePipe, private empS: EmployeeService) { }

  ngOnInit(){

  }


  getAllHoraire(){
    this.horS.getAllHoraire().subscribe(( data: any) => {
      this.horaire = data;
    });
  }

  getHoraireBtwnDate(){



    const inputElement: HTMLInputElement = document.getElementById('dateSel1') as HTMLInputElement;
    const inputValue: string = inputElement.value;
    // const inputElement2: HTMLInputElement = document.getElementById('dateSel2') as HTMLInputElement;
    // const inputValue2: string = inputElement2.value;
    this.dateIn = inputValue;
    // this.dateOut =inputValue2;
    let dateOut2 = new Date(this.dateIn);
    dateOut2.setDate(dateOut2.getDate()+7)
    console.log('la date de sortie est:', dateOut2)
    // Lundi
    const dateLundi = new Date(this.dateIn);
    dateLundi.setDate(dateLundi.getDate() + 0);
    // Mardi
    const dateMardii = new Date(this.dateIn);
    dateMardii.setDate(dateMardii.getDate() + 1);
    // Mercredi
    const dateMercredi = new Date(this.dateIn);
    dateMercredi.setDate(dateMercredi.getDate() + 2);
    // Jeudi
    const dateJeudi = new Date(this.dateIn);
    dateJeudi.setDate(dateJeudi.getDate() + 3);
    // Vendredi
    const dateVendredi = new Date(this.dateIn);
    dateVendredi.setDate(dateVendredi.getDate() + 4);
    // Samedi
    const dateSamedi = new Date(this.dateIn);
    dateSamedi.setDate(dateSamedi.getDate() + 5);
    // Dimanche
    const dateDimanche = new Date(this.dateIn);
    dateDimanche.setDate(dateDimanche.getDate() + 6);

    this.lundi = dateLundi;
    this.mardi = dateMardii;
    this.mercredi = dateMercredi;
    this.jeudi = dateJeudi;
    this.vendredi = dateVendredi;
    this.samedi = dateSamedi;
    this.dimanche = dateDimanche;


    let dateRecherche = new Date(this.dateIn);
    dateRecherche.setDate(dateRecherche.getDate() - 1);
    dateRecherche = moment(dateRecherche).format('YYYY-MM-DD') as unknown as Date;
    dateOut2 = moment(dateOut2).format('YYYY-MM-DD') as unknown as Date;
    this.empS.getAllEmploye().subscribe((response: Employe[])=>{
      this.employe = response;
      console.log(this.employe);
      this.employe.sort(function(a, b){
        if(a.nom < b.nom ) { return -1; }
        if(a.nom > b.nom) { return 1; }
        return 0;
    })
      this.employe.forEach(employe => {
        employe.semaine = new Semaine();

      });
      console.log(dateRecherche,dateOut2)
      this.horS.getHoraire(dateRecherche as unknown as string, dateOut2 as unknown as string).subscribe((data: any) =>{
      this.horaire = data;
      console.log('tous les horaire', this.horaire)


      this.horaire.forEach(h => {
        if(Number.isInteger(h as unknown as number)){
          this.horS.getScheduleById(h).subscribe((data: any)=>{
            h = data;
            console.log('horaire hash is',h);
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).horaire.push(h);

            h.dateJour = moment(h.dateJour).format('YYYY-MM-DD') as unknown as Date;
            this.lundi = moment(this.lundi).format('YYYY-MM-DD') as unknown as Date;
            this.mardi = moment(this.mardi).format('YYYY-MM-DD') as unknown as Date;
            this.mercredi = moment(this.mercredi).format('YYYY-MM-DD') as unknown as Date;
            this.jeudi = moment(this.jeudi).format('YYYY-MM-DD') as unknown as Date;
            this.vendredi = moment(this.vendredi).format('YYYY-MM-DD') as unknown as Date;
            this.samedi = moment(this.samedi).format('YYYY-MM-DD') as unknown as Date;
            this.dimanche = moment(this.dimanche).format('YYYY-MM-DD') as unknown as Date;


            if(h.dateJour === this.lundi){
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.lundi = h;
          }
            if(h.dateJour === this.mardi){
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.mardi = h;
          }
            if(h.dateJour === this.mercredi){
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.mercredi = h;
          }
            if(h.dateJour === this.jeudi){
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.jeudi = h;
          }
            if(h.dateJour === this.vendredi){
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.vendredi = h;
          }
            if(h.dateJour === this.samedi){
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.samedi = h;
          }
            if(h.dateJour === this.dimanche){
            this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.dimanche = h;
          }
            console.log(this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine)
        });


        }
        if(!Number.isInteger(h as unknown as number)){


            h.dateJour = moment(h.dateJour).format('YYYY-MM-DD') as unknown as Date;
            this.lundi = moment(this.lundi).format('YYYY-MM-DD') as unknown as Date;
            this.mardi = moment(this.mardi).format('YYYY-MM-DD') as unknown as Date;
            this.mercredi = moment(this.mercredi).format('YYYY-MM-DD') as unknown as Date;
            this.jeudi = moment(this.jeudi).format('YYYY-MM-DD') as unknown as Date;
            this.vendredi = moment(this.vendredi).format('YYYY-MM-DD') as unknown as Date;
            this.samedi = moment(this.samedi).format('YYYY-MM-DD') as unknown as Date;
            this.dimanche = moment(this.dimanche).format('YYYY-MM-DD') as unknown as Date;


            if(h.dateJour === this.lundi){
        this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.lundi = h;
      }
            if(h.dateJour === this.mardi){
        this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.mardi = h;
      }
            if(h.dateJour === this.mercredi){
        this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.mercredi = h;
      }
            if(h.dateJour === this.jeudi){
        this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.jeudi = h;
      }
            if(h.dateJour === this.vendredi){
        this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.vendredi = h;
      }
            if(h.dateJour === this.samedi){
        this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.samedi = h;
      }
            if(h.dateJour === this.dimanche){
        this.employe.find(employe => employe.idEmploye === h.employeeFromHoraire.idEmploye).semaine.dimanche = h;
      }

    }
    });

      console.log(this.employe);
      console.log(this.horaire);
      });
      this.employe.forEach(test => {
        console.log(test.semaine.lundi.nbrHeureDay)
      });
    });


    // LES DIFFERENTS TEST EN CONSOLE LOG
    /*
    console.log('date de lundi :', dateLundi);
    console.log('date de Mardi :', dateMardii);
    console.log('date de Mercredi :', dateMercredi);
    console.log('date de Jeudi :', dateJeudi);
    console.log('date de Vendredi :', dateVendredi);
    console.log('date de Samedi :', dateSamedi);
    console.log('date de Dimanche :', dateDimanche);

    */
  }
}
