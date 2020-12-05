import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumAccueilComponent } from './forum-accueil.component';

describe('ForumAccueilComponent', () => {
  let component: ForumAccueilComponent;
  let fixture: ComponentFixture<ForumAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
