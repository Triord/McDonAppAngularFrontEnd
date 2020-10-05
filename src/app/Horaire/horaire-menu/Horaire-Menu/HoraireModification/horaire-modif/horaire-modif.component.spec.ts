import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireModifComponent } from './horaire-modif.component';

describe('HoraireModifComponent', () => {
  let component: HoraireModifComponent;
  let fixture: ComponentFixture<HoraireModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraireModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
