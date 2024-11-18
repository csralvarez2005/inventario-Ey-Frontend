import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionDeEquipoFormComponent } from './asignacion-de-equipo-form.component';

describe('AsignacionDeEquipoFormComponent', () => {
  let component: AsignacionDeEquipoFormComponent;
  let fixture: ComponentFixture<AsignacionDeEquipoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionDeEquipoFormComponent]
    });
    fixture = TestBed.createComponent(AsignacionDeEquipoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
