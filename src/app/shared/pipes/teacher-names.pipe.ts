import { Pipe, PipeTransform } from '@angular/core';
import {Teacher} from "../models/teacher.model";

@Pipe({
  name: 'teacherNames'
})
export class TeacherNamesPipe implements PipeTransform {

  transform(teacher: Teacher): string {
    return `${teacher.title} ${teacher.lastName}, ${teacher.firstName}`;
  }

}
