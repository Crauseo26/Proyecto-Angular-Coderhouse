import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {StudentsDataSource, Student, STUDENT_DATA} from './student-table-datasource';
import {EXCELLENT_STUDENT_THRESHOLD, FAILED_STUDENT_THRESHOLD} from "../../../shared/constants/constants";
import {StudentService} from "../../../shared/services/student.service";
import {MatDialog} from "@angular/material/dialog";
import {StudentDetailDialogComponent} from "../student-detail-dialog/student-detail-dialog.component";
import {StudentEditDialogComponent} from "../student-edit-dialog/student-edit-dialog.component";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})

export class StudentTableComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Student>;
  private excellentStudents!: Student[];
  private failedStudents!: Student[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['average', 'fullName', 'actions'];

  constructor(private matDialog: MatDialog, private studentService: StudentService) {
    this.dataSource = new MatTableDataSource<Student>(STUDENT_DATA);
  }

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnInit(): void {
    this.excellentStudents = this.getExcellentStudents();
    this.failedStudents = this.getFailedStudents();

    this.dataSource.filterPredicate = function (data, filter) {
      return data.firstName.indexOf(filter) !== -1 || data.lastName.indexOf(filter) !== -1
    }
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  public getExcellentStudents(): Student[]{
    return this.dataSource.data?.filter( student => student.average > EXCELLENT_STUDENT_THRESHOLD);
  }

  public getFailedStudents(): Student[]{
    return this.dataSource.data?.filter( student => student.average < FAILED_STUDENT_THRESHOLD);
  }

  public isExcellentStudent(value: Student): boolean{
    return this.excellentStudents?.includes(value);
  }

  public isFailedStudent(value: Student): boolean{
    return this.failedStudents?.includes(value);
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

  public onStudentDetail(studentId: number) {
    const student = this.dataSource.data.find( s => s.id === studentId);
    let matDialog = this.matDialog.open(StudentDetailDialogComponent, {
      width: '38rem',
      height: '32rem',
      data: student
    });
  }

  public filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public addStudent(student: Student): void{
    this.dataSource.data.push(student);
  }

  public onEditStudent(studentId: number): void {
    const student = this.dataSource.data.find(s => s.id === studentId);

    if(student){
      let matDialog = this.matDialog.open(StudentEditDialogComponent, {
        width: '38rem',
        height: '32rem',
        data: student
      })

      matDialog.afterClosed().subscribe(result => {

        let updatedStudent: Student = {
          absences: student.absences,
          average: student.average,
          address: result.address,
          birthday: result.birthday,
          email: result.email,
          firstName: result.firstName,
          gender: result.gender,
          lastName: result.lastName,
          phone: result.phone,
          id: studentId
        }

        this.updateStudent(updatedStudent);
      });
    }
  }

  private updateStudent(updatedStudent: Student) {
    const updatedDatasource = this.dataSource.data.map( s => s.id == updatedStudent.id
        ? {...s,
        firstName: updatedStudent.firstName,
        lastName: updatedStudent.lastName,
        email: updatedStudent.email,
        address: updatedStudent.address,
        phone: updatedStudent.phone,
        gender: updatedStudent.gender,
        }
        : s
      );
    this.dataSource.data = updatedDatasource;
  }

  public onDeleteStudent(studentId: number): void {
    const updatedDatasource = this.dataSource.data.filter(s => s.id !== studentId);
    this.dataSource.data = updatedDatasource;
  }
}
