import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AsignacionEquipoService {

  private apiUrl = `${BASE_URL}asignaciones`;
  private apiUrlAreas = `${BASE_URL}areas`;
  private apiUrlEquipos = `${BASE_URL}equipos`;
  private apiUrlFuncionarios = `${BASE_URL}funcionarios`;

  constructor(private http: HttpClient) {}

 
  getAsignaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

 
  getAreas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAreas).pipe(
      catchError(this.handleError)
    );
  }


  getEquipos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlEquipos).pipe(
      catchError(this.handleError)
    );
  }


  getFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlFuncionarios).pipe(
      catchError(this.handleError)
    );
  }

 
  createAsignacion(asignacion: any): Observable<any> {
    if (!asignacion.areaNombre || !asignacion.equipoNombre || !asignacion.funcionarioNombre) {
      return throwError(() => new Error('Datos incompletos para la asignación.'));
    }
    return this.http.post<any>(this.apiUrl, asignacion).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMsg = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMsg = `Código de error: ${error.status}, mensaje: ${error.message}, detalles: ${JSON.stringify(error.error)}`;
    }
    console.error(errorMsg); // Log para depuración
    return throwError(() => new Error(errorMsg));
  }
  updateAsignacion(id: number, asignacion: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, asignacion).pipe(catchError(this.handleError));
  }

  deleteAsignacion(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }
}
