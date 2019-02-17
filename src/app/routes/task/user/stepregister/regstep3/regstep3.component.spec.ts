import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Regstep3Component } from './regstep3.component';

describe('Regstep3Component', () => {
  let component: Regstep3Component;
  let fixture: ComponentFixture<Regstep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Regstep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Regstep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
