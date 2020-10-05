import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireCreateComponent } from './horaire-create.component';

describe('HoraireCreateComponent', () => {
  let component: HoraireCreateComponent;
  let fixture: ComponentFixture<HoraireCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraireCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
