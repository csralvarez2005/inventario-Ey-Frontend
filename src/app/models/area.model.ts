export class Area {
    id?: number;
    nombre!: string;
    tipo!: string;

    constructor(nombre: string, tipo: string) {
      this.nombre = nombre;
      this.tipo = tipo;
    }
  }
