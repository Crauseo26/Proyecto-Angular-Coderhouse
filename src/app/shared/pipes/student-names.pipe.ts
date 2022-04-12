import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentNames'
})
export class StudentNamesPipe implements PipeTransform {

  transform(firstName: string, lastName: string): string {
    return lastName + ', ' + firstName;
  }

}
