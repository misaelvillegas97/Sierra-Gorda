import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCumpleaniosComponent } from './slider-cumpleanios.component';

describe('SliderCumpleaniosComponent', () => {
  let component: SliderCumpleaniosComponent;
  let fixture: ComponentFixture<SliderCumpleaniosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderCumpleaniosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderCumpleaniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
