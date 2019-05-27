import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaMantMinaComponent } from './gerencia-mant-mina.component';

describe('GerenciaMantMinaComponent', () => {
  let component: GerenciaMantMinaComponent;
  let fixture: ComponentFixture<GerenciaMantMinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciaMantMinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciaMantMinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
