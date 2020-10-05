import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireMenuComponent } from './horaire-menu.component';

describe('HoraireMenuComponent', () => {
  let component: HoraireMenuComponent;
  let fixture: ComponentFixture<HoraireMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraireMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
