export interface AsignacionEquipo {
  id: number;
  areaId: number;
  equipoId: number;
  funcionarioId: number;
  fechaAsignacion: string;
  nombreArea?: string;       // Nombre del área (opcional)
  nombreEquipo?: string;     // Nombre del equipo (opcional)
  nombreFuncionario?: string; // Nombre del funcionario (opcional)
}