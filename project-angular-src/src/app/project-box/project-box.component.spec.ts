import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoxComponent } from './project-box.component';

describe('ProjectBoxComponent', () => {
  let component: ProjectBoxComponent;
  let fixture: ComponentFixture<ProjectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
