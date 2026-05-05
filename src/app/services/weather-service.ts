import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { CurrentWeather, Forecast } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private apiUrl = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) { }

  //1. obtener el clima por coordenadas
  getWeatherByCoords(lat: number, lon: number): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
      .pipe(catchError(this.handleError));
  }

  //2. obtener el pronóstico por coordenadas
  getForecastByCoords(lat: number, lon: number): Observable<Forecast> {
    return this.http.get<Forecast>(`${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
      .pipe(catchError(this.handleError));
  }

  //3. guardar historial de busqueda, 5 ultimas busquedas
  saveCity(city: string): void {
    let historial: string[] = JSON.parse(localStorage.getItem('historial') || '[]');
    historial = [city, ...historial.filter(c => c !== city)].slice(0, 5);
    localStorage.setItem('historial', JSON.stringify(historial));
  }

  //4. cargar sugerencias con autocompletado
  getSuggestions(query: string): Observable<any[]> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`;
    return this.http.get<any[]>(url);
  }

  //5. manejar errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    return throwError(() => error);
  }

}
