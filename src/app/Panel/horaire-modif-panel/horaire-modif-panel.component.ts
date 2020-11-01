import { HoraireService } from 'src/app/Service/horaire.service';
import { Component, OnInit } from '@angular/core';
import { RaisonModif } from 'src/app/Interface/raisonModif';

@Component({
  selector: 'app-horaire-modif-panel',
  templateUrl: './horaire-modif-panel.component.html',
  styleUrls: ['./horaire-modif-panel.component.css']
})
export class HoraireModifPanelComponent implements OnInit {
  rm: RaisonModif[];

  constructor(private horS: HoraireService) { }

  ngOnInit(){
    this.getAllModifDone();
  }

  getAllModifDone(){
    this.horS.getAllModifDone().subscribe((data : any)=>{
      this.rm = data;
      this.rm.forEach(r => {
        if (Number.isInteger(r as unknown as number)) {
          this.horS.getModifById(r).subscribe((data2: RaisonModif) => {
            this.rm.push(data2);
          });
        }
      });
      console.log(this.rm)
    });
  }
}
