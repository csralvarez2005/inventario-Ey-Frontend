import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl = 'http://localhost:8080/api/areas';

  constructor(private http: HttpClient) {}

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getAreaById(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, area).pipe(catchError(this.handleError));
  }

  updateArea(id: number, area: Area): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, area).pipe(catchError(this.handleError));
  }

  deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  /**
   * Manejo de errores centralizado para las solicitudes HTTP.
   * @param error El error recibido durante la solicitud HTTP.
   * @returns Un observable con un mensaje de error amigable.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado.';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error del servidor: Código ${error.status}, mensaje: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
