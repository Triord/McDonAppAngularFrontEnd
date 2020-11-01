import { Employe } from './../../Interface/employe';
import { EmployeeService } from './../../Service/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employes: Employe[] = [];
  constructor(private empS: EmployeeService) { }

  ngOnInit(){
    this.getAllEmployes();
  }

  getAllEmployes(){
    this.empS.getAllEmploye().subscribe((data) => {
      this.employes = data;
      this.employes.sort(function(a, b){
        if(a.nom < b.nom ) { return -1; }
        if(a.nom > b.nom) { return 1; }
        return 0;
    })
    });
  }
}
