import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EXCELLENT_STUDENT_THRESHOLD, FAILED_STUDENT_THRESHOLD} from "../../../shared/constants/constants";
import {StudentService} from "../../../shared/services/student.service";
import {MatDialog} from "@angular/material/dialog";
import {StudentDetailDialogComponent} from "../student-detail-dialog/student-detail-dialog.component";
import {StudentEditDialogComponent} from "../student-edit-dialog/student-edit-dialog.component";
import {AddStudentDialogComponent} from "../add-student-dialog/add-student-dialog.component";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteWarningDialogComponent} from "../../../shared/delete-warning-dialog/delete-warning-dialog.component";
import {Student} from "../../../shared/models/student.model";
import {AuthenticationService} from "../../../core/auth/services/authentication.service";
import {AppState} from "../../../shared/state/app.state";
import {Store} from "@ngrx/store";
import {activeSessionSelector} from "../../../shared/state/selectors/login.selector";
import {loadedStudents, loadStudents} from "../../../shared/state/actions/students.actions";
import {studentsSelector} from "../../../shared/state/selectors/students.selector";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})

export class StudentTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private studentsSubscription!: Subscription;
  public dataSource!: MatTableDataSource<Student>;
  private excellentStudents!: Student[];
  private failedStudents!: Student[];
  public isAdmin= false;
  public isLoading = false;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['average', 'fullName', 'actions'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar,
              private studentService: StudentService,
              private authService: AuthenticationService,
              private store: Store<AppState>) {

    this.getStudentsData();
    this.store.select(activeSessionSelector).subscribe(session =>{
      this.isAdmin = session.currentUser.isAdmin;
    });

  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.getStudentsData();
  }

  public ngOnInit(): void { }

  public  ngOnDestroy(): void{
    this.studentsSubscription.unsubscribe();
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

  public onStudentDetail(selectedStudent: Student) {
    let matDialog = this.matDialog.open(StudentDetailDialogComponent, {
      width: '38rem',
      height: '35rem',
      data: selectedStudent
    });
  }

  public filterTable(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
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
            id: selectedStudent.id,
            Courses: [],
          }
          this.updateStudent(updatedStudent);
        }
      });
    }
  }

  private updateStudent(updatedStudent: Student) {
    this.studentsSubscription = this.studentService.update(updatedStudent).subscribe(result =>{
      this.dataSource = new MatTableDataSource<Student>(undefined);
      this.getStudentsData();
    });
  }

  public onDeleteStudent(selectedStudent: Student): void {

    const dialogRef = this.matDialog.open(DeleteWarningDialogComponent, {
      width: '25rem',
      height: '10rem',
      data: 'student'
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.studentsSubscription = this.studentService.delete(selectedStudent.id).subscribe(result =>{
          this.dataSource = new MatTableDataSource<Student>(undefined);
          this.snackBar.open('Student deleted successfully ✔', 'close', {verticalPosition: "top", duration: 1000, horizontalPosition: 'center'})
          this.getStudentsData();
        });
      }
    });
  }

  private setStudentsData(): void {
    this.store.select(studentsSelector).subscribe(state =>{
      this.dataSource = new MatTableDataSource<Student>(state.students);
    })
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
        Courses: [],
      }
      this.studentsSubscription = this.studentService.create(newStudent).subscribe(result =>{
        this.dataSource = new MatTableDataSource<Student>(undefined);
        this.getStudentsData();
      });
    });

  }

  private getNextId(): number {
    return this.dataSource.data.length + 1;
  }

  public isTopTenStudent(student: Student): boolean {
    return this.isExcellentStudent(student)? true : this.isFailedStudent(student);
  }

  private getStudentsData(): void {
    this.store.dispatch(loadStudents());
    this.store.select(studentsSelector).subscribe(state =>{
      this.isLoading = state.isLoading;
    });
    this.studentsSubscription = this.studentService.get().subscribe(students => {
      this.store.dispatch(loadedStudents({students: students}))
      this.setStudentsData();
    });
  }
}
