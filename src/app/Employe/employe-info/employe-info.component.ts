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
    this.empS.saveRaisonViewedEmp(this.ve).subscribe((data: any) => {
      console.log(this.ve);
    });
    this.isSend = true;
  }

}
