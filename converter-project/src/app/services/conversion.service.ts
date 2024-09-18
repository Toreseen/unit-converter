import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Unit converstion method
  convert(value: number, fromUnit: string, toUnit: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/convert`, { value, from_unit: fromUnit, to_unit: toUnit })
      .pipe(
        catchError(this.handleError('convert'))
      );
  }

  // Unit addition method
  add(value1: number, unit1: string, value2: number, unit2: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { value1, unit1, value2, unit2 })
      .pipe(
        catchError(this.handleError('add'))
      );
  }

  // Unit subtraction method
  subtract(value1: number, unit1: string, value2: number, unit2: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/subtract`, { value1, unit1, value2, unit2 })
      .pipe(
        catchError(this.handleError('subtract'))
      );
  }

  // Error handler method
  private handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage = `Failed to ${operation} units. Please check your input and try again.`;
      if (error.error && error.error.error) {
        console.error(`Error: ${error.error.error}`);
      }
      return throwError(() => errorMessage);
    };
  }
}

