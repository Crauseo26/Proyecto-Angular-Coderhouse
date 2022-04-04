import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {StudentsDataSource, Student} from './student-table-datasource';
import {EXCELLENT_STUDENT_THRESHOLD, FAILED_STUDENT_THRESHOLD} from "../../../shared/constants/constants";


@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Student>;
  dataSource: StudentsDataSource;
  private students!: Student[];
  private excellentStudents!: Student[];
  private failedStudents!: Student[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['average', 'name', 'birthday', 'phone'];

  constructor() {
    this.dataSource = new StudentsDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.students = this.dataSource.data;
    this.excellentStudents = this.getExcellentStudents();
    this.failedStudents = this.getFailedStudents();
  }

  public refresh(): void {
    this.table.renderRows();
  }

  public getExcellentStudents(): Student[]{
    return this.students.filter( student => student.average > EXCELLENT_STUDENT_THRESHOLD);
  }

  public getFailedStudents(): Student[]{
    return this.students.filter( student => student.average < FAILED_STUDENT_THRESHOLD);
  }

  public isExcellentStudent(value: Student): boolean{
    return this.excellentStudents.includes(value);
  }
  public isFailedStudent(value: Student): boolean{
    return this.failedStudents.includes(value);
  }

  public setStyleByCalification(student: Student): string{

    if(this.isExcellentStudent(student)){
      return 'excellent-student';
    }else if(this.isFailedStudent(student)){
      return 'failed-student';
    }else{
      return '';
    }
  }
}
