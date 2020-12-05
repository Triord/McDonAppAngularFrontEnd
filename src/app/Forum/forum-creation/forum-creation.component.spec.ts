import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCreationComponent } from './forum-creation.component';

describe('ForumCreationComponent', () => {
  let component: ForumCreationComponent;
  let fixture: ComponentFixture<ForumCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
