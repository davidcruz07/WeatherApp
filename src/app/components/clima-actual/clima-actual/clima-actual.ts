import { Component, Input } from '@angular/core';
import { CurrentWeather } from '../../../models/weather';
import { CommonModule } from '@angular/common';
import { KelvinCelsiusPipe } from '../../../pipes/kelvin-celsius-pipe';


@Component({
  selector: 'app-clima-actual',
  imports: [CommonModule, KelvinCelsiusPipe],
  templateUrl: './clima-actual.html',
  styleUrl: './clima-actual.css',
})
export class ClimaActual {
  @Input() data: CurrentWeather | null = null;
}
