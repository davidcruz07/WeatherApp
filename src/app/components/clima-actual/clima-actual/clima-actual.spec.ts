import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaActual } from './clima-actual';

describe('ClimaActual', () => {
  let component: ClimaActual;
  let fixture: ComponentFixture<ClimaActual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimaActual],
    }).compileComponents();

    fixture = TestBed.createComponent(ClimaActual);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
