import { Pipe, PipeTransform } from '@angular/core';

export function getDateFromString(value: string): Date | null {
  if (value) {
    const pattern = /(\d{4})(\d{2})(\d{2})/;
    let date = new Date(value.replace(pattern,'$1-$2-$3'));
    return date;
  }
  return null;
}

@Pipe({
  name: 'formatDate',
  pure: true
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string | undefined): Date | null {
    if (value) {
      return getDateFromString(value);
    } else {
      return null;
    }
  }

}
