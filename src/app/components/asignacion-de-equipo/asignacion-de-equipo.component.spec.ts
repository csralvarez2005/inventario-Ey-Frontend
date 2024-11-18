import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionDeEquipoComponent } from './asignacion-de-equipo.component';

describe('AsignacionDeEquipoComponent', () => {
  let component: AsignacionDeEquipoComponent;
  let fixture: ComponentFixture<AsignacionDeEquipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionDeEquipoComponent]
    });
    fixture = TestBed.createComponent(AsignacionDeEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
