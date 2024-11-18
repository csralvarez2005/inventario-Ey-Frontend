export class Equipo {
    equipoId?: number;
    nombre!: string;
    serie!: string;
    modelo!: string;
    tipo!: string;
    fechaDeCompra!: string;
    marca!: string;
    proveedor!: string;
    factura!: string;
    garantia!: string;
    fechaFinGarantia!: string;
    recibidoPor!: string;
    ordenDeCompra!: string;
    ubicacionDelEquipo!: string;
    descripcion!: string;
    componentes!: string;
    accesorios!: string;
    utilizacion!: string;
    precio!: number;  // Added precio property of type double (number in TypeScript)

    constructor(
        nombre: string,
        serie: string,
        modelo: string,
        tipo: string,
        fechaDeCompra: string,
        marca: string,
        proveedor: string,
        factura: string,
        garantia: string,
        fechaFinGarantia: string,
        recibidoPor: string,
        ordenDeCompra: string,
        ubicacionDelEquipo: string,
        descripcion: string,
        componentes: string,
        accesorios: string,
        utilizacion: string,
        precio: number  // Added precio parameter to constructor
    ) {
        this.nombre = nombre;
        this.serie = serie;
        this.modelo = modelo;
        this.tipo = tipo;
        this.fechaDeCompra = fechaDeCompra;
        this.marca = marca;
        this.proveedor = proveedor;
        this.factura = factura;
        this.garantia = garantia;
        this.fechaFinGarantia = fechaFinGarantia;
        this.recibidoPor = recibidoPor;
        this.ordenDeCompra = ordenDeCompra;
        this.ubicacionDelEquipo = ubicacionDelEquipo;
        this.descripcion = descripcion;
        this.componentes = componentes;
        this.accesorios = accesorios;
        this.utilizacion = utilizacion;
        this.precio = precio;  // Initialize precio
    }
}