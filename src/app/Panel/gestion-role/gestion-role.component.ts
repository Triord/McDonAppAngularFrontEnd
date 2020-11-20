import { UserRole } from './../../Interface/userRole';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { EmployeeService } from './../../Service/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/Interface/employe';

@Component({
  selector: 'app-gestion-role',
  templateUrl: './gestion-role.component.html',
  styleUrls: ['./gestion-role.component.css']
})
export class GestionRoleComponent implements OnInit {
  employes: Employe[] =[];
  employe: Employe;
  userR: UserRole = new UserRole();
  constructor(private empS: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(){
    const idEmp = this.route.snapshot.params.id;
    this.empS.getTestMethod2(idEmp).subscribe((data: UserRole) => {
      console.log(data[0]);
      this.userR.idEmp = data[0];
      this.userR.nom = data[1];
      this.userR.prenom = data[2];
      this.userR.nomRole = data[3];

      console.log(this.userR);
    });
  }
  inChief(){
    const idEmp = this.route.snapshot.params.id;
    this.empS.beAChief(idEmp).subscribe((data: any) => {
    });
    location.reload();
  }
  inManager(){
    const idEmp = this.route.snapshot.params.id;
    this.empS.beAMana(idEmp).subscribe((data: any) => {
    });
    location.reload();
  }
  inWorker(){
    const idEmp = this.route.snapshot.params.id;
    this.empS.beAWorker(idEmp).subscribe((data: any) => {
    });
    location.reload();
  }
  inStudent(){
    const idEmp = this.route.snapshot.params.id;
    this.empS.beAStudent(idEmp).subscribe((data: any) => {
    });
    location.reload();
  }
}
