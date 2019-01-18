import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Regstep4Component } from './regstep4.component';

describe('Regstep4Component', () => {
  let component: Regstep4Component;
  let fixture: ComponentFixture<Regstep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Regstep4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Regstep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
