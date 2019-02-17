import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectreqComponent } from './projectreq.component';

describe('ProjectreqComponent', () => {
  let component: ProjectreqComponent;
  let fixture: ComponentFixture<ProjectreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
