import { DisponiniliteService } from './../../../../Service/disponinilite.service';
import { Component, OnInit } from '@angular/core';
import { Disponibilite } from 'src/app/Interface/disponinilite';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-disponibilite-employe',
  templateUrl: './disponibilite-employe.component.html',
  styleUrls: ['./disponibilite-employe.component.css']
})
export class DisponibiliteEmployeComponent implements OnInit {
  disp : Disponibilite;
  stat = '';
  constructor(private dispS: DisponiniliteService, private route: ActivatedRoute) { }

  ngOnInit(){
    const id = this.route.snapshot.params.id;
    console.log('id du componenent =', id);
    this.dispS.getOneDispo(id).subscribe((dispo: Disponibilite) => {
    console.log(dispo);
    this.disp = dispo;
    this.disp as Disponibilite;
    console.log('test', this.disp);
    if (this.disp.employee.statut === true) {
     this.stat = 'travailleur toujours actif'
    } else {
      this.stat = 'ancien employe';
    }
      });

  }

  }


