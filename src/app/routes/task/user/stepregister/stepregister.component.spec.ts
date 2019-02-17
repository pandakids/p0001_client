import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepregisterComponent } from './stepregister.component';

describe('StepregisterComponent', () => {
  let component: StepregisterComponent;
  let fixture: ComponentFixture<StepregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
