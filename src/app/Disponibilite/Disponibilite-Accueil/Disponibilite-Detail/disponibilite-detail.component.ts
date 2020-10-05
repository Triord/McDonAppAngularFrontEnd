import { DisponiniliteService } from './../../../Service/disponinilite.service';
import { Component, OnInit } from '@angular/core';
import { RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Disponibilite } from 'src/app/Interface/disponinilite';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-disponibilite-detail',
  templateUrl: './disponibilite-detail.component.html',
  styleUrls: ['./disponibilite-detail.component.css']
})
export class DisponibiliteDetailComponent implements OnInit {
  disp: Disponibilite;
  dispo: Disponibilite = new Disponibilite();

  constructor(private route: ActivatedRoute, private dispS: DisponiniliteService, private fb: FormBuilder) {
  }
  stat = '';


ngOnInit() {
    const id = this.route.snapshot.params.id;
    console.log('id du componenent =', id);
    this.dispS.getOneDispo(id).subscribe((disp: Disponibilite) => {
    console.log(disp);
    this.disp = disp;
    console.log('test', this.disp);
    if (this.disp.employee.statut === true) {
     this.stat = 'travailleur toujours actif'
    } else {
      this.stat = 'ancien employe';
    }
      });

  }

upDispok(): void {
    const id = this.route.snapshot.params.id;
    this.dispo.idDispo = this.disp.idDispo;

    console.log(this.dispo.lundi);

    if (typeof this.dispo.lundi === 'undefined' ) {
   this.dispo.lundi = this.disp.lundi; }
    if (typeof this.dispo.lundi2 === 'undefined' ) {
  this.dispo.lundi2 = this.disp.lundi2; }
    if (typeof this.dispo.mardi === 'undefined' ) {
  this.dispo.mardi = this.disp.mardi; }
    if (typeof this.dispo.mardi2 === 'undefined' ) {
  this.dispo.mardi2 = this.disp.mardi2; }
    if (typeof this.dispo.mercredi === 'undefined' ) {
  this.dispo.mercredi = this.disp.mercredi; }
    if (typeof this.dispo.mercredi2 === 'undefined' ) {
  this.dispo.mercredi2 = this.disp.mercredi2; }
    if (typeof this.dispo.jeudi === 'undefined' ) {
  this.dispo.jeudi = this.disp.jeudi; }
    if (typeof this.dispo.jeudi2 === 'undefined' ) {
  this.dispo.jeudi2 = this.disp.jeudi2; }
    if (typeof this.dispo.vendredi === 'undefined' ) {
  this.dispo.vendredi = this.disp.vendredi; }
    if (typeof this.dispo.vendredi2 === 'undefined' ) {
  this.dispo.vendredi2 = this.disp.vendredi2; }
    if (typeof this.dispo.samedi === 'undefined' ) {
  this.dispo.samedi = this.disp.samedi; }
    if (typeof this.dispo.samedi2 === 'undefined' ) {
  this.dispo.samedi2 = this.disp.samedi2; }
    if (typeof this.dispo.dimanche === 'undefined' ) {
  this.dispo.dimanche = this.disp.dimanche; }
    if (typeof this.dispo.dimanche2 === 'undefined' ) {
  this.dispo.dimanche2 = this.disp.dimanche2; }





    this.dispS.upOneDispo(id, this.dispo).subscribe((reponse) => {
      this.dispo.idDispo = this.disp.idDispo;
      console.log(this.dispo.idDispo);
      alert('dispo update successfully.');

        });

  }


}
