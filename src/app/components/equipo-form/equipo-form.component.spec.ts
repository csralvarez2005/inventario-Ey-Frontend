import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoFormComponent } from './equipo-form.component';

describe('EquipoFormComponent', () => {
  let component: EquipoFormComponent;
  let fixture: ComponentFixture<EquipoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipoFormComponent]
    });
    fixture = TestBed.createComponent(EquipoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
