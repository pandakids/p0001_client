import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreregisterComponent } from './preregister.component';

describe('PreregisterComponent', () => {
  let component: PreregisterComponent;
  let fixture: ComponentFixture<PreregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
