import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProjectComponent } from './display-project.component';

describe('DisplayProjectComponent', () => {
  let component: DisplayProjectComponent;
  let fixture: ComponentFixture<DisplayProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
