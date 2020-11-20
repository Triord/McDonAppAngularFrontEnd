import { Horaire } from 'src/app/Interface/horaire';
import { HoraireService } from 'src/app/Service/horaire.service';
import { Component, OnInit } from '@angular/core';
import { RaisonModif } from 'src/app/Interface/raisonModif';
import { Employe } from 'src/app/Interface/employe';
import { timeout } from 'rxjs/operators';
import { type } from 'os';

@Component({
  selector: 'app-horaire-modif-panel',
  templateUrl: './horaire-modif-panel.component.html',
  styleUrls: ['./horaire-modif-panel.component.css']
})
export class HoraireModifPanelComponent implements OnInit {
  rm: RaisonModif[] = [];
  rm2: RaisonModif[] = [];
  hor: Horaire[] = [];
  employe: Employe[] = [];
  constructor(private horS: HoraireService) { }

  ngOnInit() {
    this.getAllModifDone();

  }

  getAllModifDone() {
    this.horS.getAllModifDone().subscribe((data: any) => {
      this.rm2 = data;
      console.log(this.rm2);

      this.rm2.forEach(r => {
         this.hor.push(r.horaire);

         if (typeof r.horaire === 'number') {
          this.horS.getScheduleById(r.horaire).subscribe((data3: any) => {
            this.hor.push(data3);
            r.horaire = data3;
          });
         }
        }
      );
      console.log(this.hor);



    });
    /*setTimeout(() => {
      console.log(this.hor.length);
      for (const ho of this.hor) {
        if (Number.isInteger(ho as unknown as number)) {
          this.horS.getScheduleById(ho).subscribe((data3: any) => {
            //console.log(data3);
            this.hor.push(data3);

          });
        }

      }
      setTimeout(() => {
        console.log(this.hor)
      }, 1000);
    }, 1000);

*/
  }
}
