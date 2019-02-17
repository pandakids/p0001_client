import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectrolesComponent } from './projectroles.component';

describe('ProjectrolesComponent', () => {
  let component: ProjectrolesComponent;
  let fixture: ComponentFixture<ProjectrolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectrolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
