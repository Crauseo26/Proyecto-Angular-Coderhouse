import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {StudentsDataSource, Student} from './student-table-datasource';
import {EXCELLENT_STUDENT_THRESHOLD, FAILED_STUDENT_THRESHOLD} from "../../../shared/constants/constants";
import {StudentService} from "../../../shared/services/student.service";
import {MatDialog} from "@angular/material/dialog";
import {StudentDetailDialogComponent} from "../student-detail-dialog/student-detail-dialog.component";
import {StudentEditDialogComponent} from "../student-edit-dialog/student-edit-dialog.component";
import {AddStudentDialogComponent} from "../add-student-dialog/add-student-dialog.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})

export class StudentTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private students: Student[] = [];
  private studentsSuscription!: Subscription;
  public dataSource!: MatTableDataSource<Student>;
  private excellentStudents!: Student[];
  private failedStudents!: Student[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['average', 'fullName', 'actions'];

  constructor(private matDialog: MatDialog, private studentService: StudentService) {
    this.getStudentsData();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.getStudentsData();
  }

  public ngOnInit(): void {

    this.dataSource.filterPredicate = function (data, filter) {
      return data.firstName.indexOf(filter) !== -1 || data.lastName.indexOf(filter) !== -1;
    }

  }

  public  ngOnDestroy(): void{
    this.studentsSuscription.unsubscribe();
  }


  public getExcellentStudents(): Student[]{
    let filteredStudentList = this.dataSource.data?.filter( student => student.average > EXCELLENT_STUDENT_THRESHOLD).sort(
      function desc(a, b) {
        return b.average - a.average;
      }
    );
    console.log(filteredStudentList?.slice(0,10))
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

  private addStudent(student: Student): void{
    this.dataSource.data.push(student);
  }

  public onEditStudent(selectedStudent: Student): void {

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

    this.studentsSuscription = this.studentService.update(updatedStudent).subscribe(result =>{
      this.getStudentsData();
      this.studentsSuscription.unsubscribe();
    });
  }

  public onDeleteStudent(selectedStudent: Student): void {
    const updatedDatasource = this.dataSource.data.filter(s => s.id !== selectedStudent.id);
    this.dataSource.data = updatedDatasource;
  }

  private setStudentsData(): void {
    this.dataSource = new MatTableDataSource<Student>(this.students);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.excellentStudents = this.getExcellentStudents();
    this.failedStudents = this.getFailedStudents();
  }

  public onAddStudent(): void {
    const matDialog = this.matDialog.open(AddStudentDialogComponent);

    matDialog.afterClosed().subscribe(result => {
      let newStudent: Student = {
        id: this.getNextId(),
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        gender: result.gender,
        address: result.address,
        birthday: result.birthday,
        phone: result.phone,
        profilePhoto: result.profilePhoto,
        average: Math.floor((Math.random() * (99 - 45 + 1)) + 45),
        absences: Math.floor((Math.random() * (8 - 1 + 1)) + 1),
      }
      this.addStudent(newStudent);
      this.studentsSuscription = this.studentService.create(newStudent).subscribe(result =>{
        this.studentsSuscription.unsubscribe();
      });
    });

  }

  private getNextId(): number {
    return this.dataSource.data.length + 1;
  }

  public isTopTenStudent(student: Student): boolean {
    return this.isExcellentStudent(student)? true : this.isFailedStudent(student)? true: false;
  }

  private getStudentsData(): void {
    this.studentsSuscription = this.studentService.get().subscribe(result => {
      this.students = result;
      this.setStudentsData();
      this.studentsSuscription.unsubscribe();
    });
  }
}
