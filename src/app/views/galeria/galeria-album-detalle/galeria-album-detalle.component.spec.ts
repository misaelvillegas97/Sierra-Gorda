import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaAlbumDetalleComponent } from './galeria-album-detalle.component';

describe('GaleriaAlbumDetalleComponent', () => {
  let component: GaleriaAlbumDetalleComponent;
  let fixture: ComponentFixture<GaleriaAlbumDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaAlbumDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaAlbumDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
