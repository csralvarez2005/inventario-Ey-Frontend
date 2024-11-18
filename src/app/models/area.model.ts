export class Area {
  areaId?: number;
    nombre!: string;
    tipo!: string;

    constructor(nombre: string, tipo: string) {
      this.nombre = nombre;
      this.tipo = tipo;
    }
  }
