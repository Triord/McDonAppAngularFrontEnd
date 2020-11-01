import { EmployeeService } from 'src/app/Service/employee.service';
import { ViewEmploye } from './../../Interface/viewEmploye';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visio-emp-panel',
  templateUrl: './visio-emp-panel.component.html',
  styleUrls: ['./visio-emp-panel.component.css']
})
export class VisioEmpPanelComponent implements OnInit {
  ve: ViewEmploye[] = [];
  constructor(private empS: EmployeeService) { }

  ngOnInit(){
    this.empS.allViewDone().subscribe((data: ViewEmploye[]) => {
      this.ve = data;
      this.ve.forEach(v => {
        if (Number.isInteger(v as unknown as number)) {
          this.empS.getOneVisioEmp(v).subscribe((data2: ViewEmploye) => {
            this.ve.push(data2);
          });
        }
      });
      console.log(this.ve)
    });
    }

}
