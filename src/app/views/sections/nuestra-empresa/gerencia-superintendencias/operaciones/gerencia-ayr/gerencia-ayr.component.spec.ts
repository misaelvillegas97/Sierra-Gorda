import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaAyrComponent } from './gerencia-ayr.component';

describe('GerenciaAyrComponent', () => {
  let component: GerenciaAyrComponent;
  let fixture: ComponentFixture<GerenciaAyrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciaAyrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciaAyrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
