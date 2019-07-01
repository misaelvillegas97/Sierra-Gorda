import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaLaboralComponent } from './clima-laboral.component';

describe('ClimaLaboralComponent', () => {
  let component: ClimaLaboralComponent;
  let fixture: ComponentFixture<ClimaLaboralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimaLaboralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
