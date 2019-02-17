import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Regstep2Component } from './regstep2.component';

describe('Regstep2Component', () => {
  let component: Regstep2Component;
  let fixture: ComponentFixture<Regstep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Regstep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Regstep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
