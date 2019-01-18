import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmodulesComponent } from './projectmodules.component';

describe('ProjectmodulesComponent', () => {
  let component: ProjectmodulesComponent;
  let fixture: ComponentFixture<ProjectmodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectmodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
