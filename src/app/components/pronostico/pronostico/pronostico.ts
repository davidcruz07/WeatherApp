import { Component, Input } from '@angular/core';
import { ForecastItem } from '../../../models/weather';
import {KelvinCelsiusPipe} from '../../../pipes/kelvin-celsius-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pronostico',
  imports: [CommonModule, KelvinCelsiusPipe],
  templateUrl: './pronostico.html',
  styleUrl: './pronostico.css',
})
export class Pronostico {
  @Input() items: ForecastItem[] = [];
}
