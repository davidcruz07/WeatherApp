import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinCelsius',
})
export class KelvinCelsiusPipe implements PipeTransform {
  transform(value: number | undefined | null ): string {
    if (value == null || value == undefined || isNaN(value)) {
      return '--';
    }

    const celsius = value - 273.15;
    return celsius.toFixed(1) + '°C';
  }
}
