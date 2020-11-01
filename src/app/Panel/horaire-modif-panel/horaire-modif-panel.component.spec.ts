import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireModifPanelComponent } from './horaire-modif-panel.component';

describe('HoraireModifPanelComponent', () => {
  let component: HoraireModifPanelComponent;
  let fixture: ComponentFixture<HoraireModifPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraireModifPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireModifPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
