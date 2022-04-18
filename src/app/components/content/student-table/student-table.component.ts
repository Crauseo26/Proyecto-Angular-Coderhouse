import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {StudentsDataSource, Student} from './student-table-datasource';
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

export class StudentTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private students!: Student[];
  public dataSource!: MatTableDataSource<Student>;
  private excellentStudents!: Student[];
  private failedStudents!: Student[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['average', 'fullName', 'actions'];

  constructor(private matDialog: MatDialog, private studentService: StudentService) {
    studentService.get().toPromise().then(response => {
      this.students = response;
      this.setStudentsData();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnInit(): void {

    this.excellentStudents = this.getExcellentStudents();
    this.failedStudents = this.getFailedStudents();

    this.dataSource.filterPredicate = function (data, filter) {
      return data.firstName.indexOf(filter) !== -1 || data.lastName.indexOf(filter) !== -1;
    }
  }

  public getExcellentStudents(): Student[]{
    let filteredStudentList = this.dataSource.data?.filter( student => student.average > EXCELLENT_STUDENT_THRESHOLD).sort(
      function desc(a, b) {
        return b.average - a.average;
      }
    );
    return filteredStudentList.slice(0,10);
  }

  public getFailedStudents(): Student[]{
    let filteredStudentList = this.dataSource.data?.filter( student => student.average < FAILED_STUDENT_THRESHOLD).sort(
      function asc(a, b) {
        return a.average - b.average;
      }
    );
    return filteredStudentList.slice(0,10);
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

  public onStudentDetail(selectedStudent: Student) {
    let matDialog = this.matDialog.open(StudentDetailDialogComponent, {
      width: '38rem',
      height: '35rem',
      data: selectedStudent
    });
  }

  public filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public addStudent(student: Student): void{
    this.dataSource.data.push(student);
  }

  public onEditStudent(selectedStudent: Student): void {
    console.log(selectedStudent);
    if(selectedStudent){
      let matDialog = this.matDialog.open(StudentEditDialogComponent, {
        width: '38rem',
        height: '32rem',
        data: selectedStudent
      })

      matDialog.afterClosed().subscribe(result => {

        if(result){
          let updatedStudent: Student = {
            absences: selectedStudent.absences,
            average: selectedStudent.average,
            address: result.address,
            birthday: result.birthday,
            email: result.email,
            firstName: result.firstName,
            gender: result.gender,
            lastName: result.lastName,
            phone: result.phone,
            profilePhoto: result.profilePhoto,
            id: selectedStudent.id
          }
          this.updateStudent(updatedStudent);
        }
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

  public onDeleteStudent(selectedStudent: Student): void {
    const updatedDatasource = this.dataSource.data.filter(s => s.id !== selectedStudent.id);
    this.dataSource.data = updatedDatasource;
  }

  private setStudentsData() {
    this.dataSource = new MatTableDataSource<Student>(this.students);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
}
