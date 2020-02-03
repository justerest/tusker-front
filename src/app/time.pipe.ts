import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
  transform(timeInMinutes: number): string {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = Math.floor(timeInMinutes % 60);
    return [
      [hours, 'h'],
      [minutes, 'm'],
    ]
      .filter(([value]) => value)
      .flat()
      .join(' ');
  }
}
