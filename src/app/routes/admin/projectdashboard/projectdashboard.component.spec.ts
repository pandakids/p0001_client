import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectdashboardComponent } from './projectdashboard.component';

describe('ProjectdashboardComponent', () => {
  let component: ProjectdashboardComponent;
  let fixture: ComponentFixture<ProjectdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
