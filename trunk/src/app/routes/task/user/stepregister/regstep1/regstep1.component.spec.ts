import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Regstep1Component } from './regstep1.component';

describe('Regstep1Component', () => {
  let component: Regstep1Component;
  let fixture: ComponentFixture<Regstep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Regstep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Regstep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
