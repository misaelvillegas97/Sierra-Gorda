import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesempenioComponent } from './gestion-desempenio.component';

describe('GestionDesempenioComponent', () => {
  let component: GestionDesempenioComponent;
  let fixture: ComponentFixture<GestionDesempenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDesempenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDesempenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
