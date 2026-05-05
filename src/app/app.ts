import { Component, OnInit, signal } from '@angular/core';
import { WeatherService } from './services/weather-service';
import { ClimaActual } from './components/clima-actual/clima-actual/clima-actual';
import { CurrentWeather, ForecastItem } from './models/weather';
import { Pronostico } from './components/pronostico/pronostico/pronostico';
import { Historial } from './components/historial/historial/historial';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHistory, faLocationDot, faMagnifyingGlass, faExclamationTriangle,
  faCircleNotch,
  faWifi
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ClimaActual, Pronostico, Historial, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private searchTimeout: any;
  showHistory = signal(false);
  iconHistory = faHistory;
  iconLocation = faLocationDot;
  iconSearch = faMagnifyingGlass;
  iconError = faExclamationTriangle;
  iconLoading = faCircleNotch;
  iconNoWifi = faWifi;

  state = signal({
    loading: false,
    error: null as string | null,
    current: null as CurrentWeather | null,
    forecast: null as ForecastItem[] | null,
    history: [] as string[],
    sugerencias: [] as any[]
  });

  constructor(private weatherService: WeatherService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cargarHistorialDesdeStorage();
  }

  buscar(ciudad: string) {
    if (!ciudad.trim()) return;

    this.state.update(s => ({ ...s, loading: true, error: null }));

    this.weatherService.getSuggestions(ciudad).subscribe({
      next: (lugares) => {
        if (!lugares || lugares.length === 0) {
          this.state.update(s => ({
            ...s,
            loading: false,
            error: 'Ciudad no encontrada',
            current: null,
            forecast: null
          }));
          return;
        }

        const { lat, lon } = lugares[0];
        this.buscarPorCoordenadas(lat, lon);
      },
      error: (err) => {
        let mensaje = "Ocurrió un error inesperado";
        if (err.status === 0) mensaje = "Sin conexión a internet";

        this.state.update(s => ({
          ...s,
          loading: false,
          error: mensaje,
          current: null,
          forecast: null
        }));
      }
    });
  }

  buscarPorCoordenadas(lat: number, lon: number) {
    this.state.update(s => ({ ...s, loading: true, error: null }));

    this.weatherService.getWeatherByCoords(lat, lon).subscribe({
      next: (data) => {
        this.state.update(s => ({ ...s, current: data, loading: false }));
        this.guardarEnHistorial(data.name);
        this.buscarPronosticoPorCoordenadas(lat, lon);
      },
      error: (err) => {
        let mensaje = "Ocurrió un error inesperado";
        if (err.status === 404) mensaje = "Ciudad no encontrada";
        else if (err.status === 0) mensaje = "Sin conexión a internet";

        this.state.update(s => ({
          ...s,
          loading: false,
          error: mensaje,
          current: null,
          forecast: null
        }));
      }
    });
  }

  private buscarPronosticoPorCoordenadas(lat: number, lon: number) {
    this.weatherService.getForecastByCoords(lat, lon).subscribe({
      next: (data) => {
        const filteredForecast = data.list.filter((item: any) =>
          item.dt_txt.includes('12:00:00')
        );
        this.state.update(s => ({ ...s, forecast: filteredForecast, loading: false }));
      },
      error: () => {
        this.state.update(s => ({ ...s, loading: false }));
      }
    });
  }

  filtrarSugerencias(termino: string) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    if (!termino.trim() || termino.length < 3) {
      this.state.update(s => ({ ...s, sugerencias: [] }));
      return;
    }

    this.searchTimeout = setTimeout(() => {
      this.weatherService.getSuggestions(termino).subscribe({
        next: (data) => {
          console.log('DATOS DE LA API:', data);
          this.state.update(s => ({ ...s, sugerencias: data }));
        },
        error: () => this.state.update(s => ({ ...s, sugerencias: [] }))
      });
    }, 300);
  }

  seleccionarSugerencia(lugar: any) {
    this.state.update(s => ({ ...s, sugerencias: [] }));

    if (typeof lugar === 'string') {
      if (lugar.trim()) this.buscar(lugar.trim());
      return;
    }

    this.buscarPorCoordenadas(lugar.lat, lugar.lon);
  }

  limpiarSugerencias() {
    this.state.update(s => ({ ...s, sugerencias: [] }));
  }

  private cargarHistorialDesdeStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const historial = localStorage.getItem('historial');
      if (historial) {
        this.state.update(s => ({ ...s, history: JSON.parse(historial) }));
      }
    }
  }

  private guardarEnHistorial(nombreCiudad: string) {
    if (!nombreCiudad || nombreCiudad.trim() === '') return;

    if (isPlatformBrowser(this.platformId)) {
      const currentHistory = this.state().history;
      let nuevoHistorial = [nombreCiudad, ...currentHistory.filter(c => c !== nombreCiudad)];
      nuevoHistorial = nuevoHistorial.slice(0, 5);

      this.state.update(s => ({ ...s, history: nuevoHistorial }));
      localStorage.setItem('historial', JSON.stringify(nuevoHistorial));
    }
  }

  toggleHistorial() {
    this.showHistory.update(v => !v);
  }
}
