import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisioEmpPanelComponent } from './visio-emp-panel.component';

describe('VisioEmpPanelComponent', () => {
  let component: VisioEmpPanelComponent;
  let fixture: ComponentFixture<VisioEmpPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisioEmpPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisioEmpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
