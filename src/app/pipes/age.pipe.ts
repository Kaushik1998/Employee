import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: number): string {
    return 0 <= value ? `${value} years old` : `${value} is invalid age.`;
  }
}
