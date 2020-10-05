import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireVisioComponent } from './horaire-visio.component';

describe('HoraireVisioComponent', () => {
  let component: HoraireVisioComponent;
  let fixture: ComponentFixture<HoraireVisioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraireVisioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireVisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
