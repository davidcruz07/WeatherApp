import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-historial',
  imports: [FontAwesomeModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial {
  @Input() ciudades: string[] = [];
  @Output() alSeleccionar = new EventEmitter<string>();

  iconHistory = faHistory;

  seleccionarCiudad(ciudad: string) {
    this.alSeleccionar.emit(ciudad);
  }
}
