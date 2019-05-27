import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaMantencionPlantaComponent } from './gerencia-mantencion-planta.component';

describe('GerenciaMantencionPlantaComponent', () => {
  let component: GerenciaMantencionPlantaComponent;
  let fixture: ComponentFixture<GerenciaMantencionPlantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciaMantencionPlantaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciaMantencionPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
