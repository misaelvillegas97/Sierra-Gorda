import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesListaComponent } from './operaciones-lista.component';

describe('OperacionesListaComponent', () => {
  let component: OperacionesListaComponent;
  let fixture: ComponentFixture<OperacionesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacionesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
