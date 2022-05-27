import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../../shared/models/courses.model';
import { Enrollment } from '../../../shared/models/enrollment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EnrollmentService } from '../../../shared/services/enrollment.service';
import { DeleteWarningDialogComponent } from '../../../shared/delete-warning-dialog/delete-warning-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Student } from '../../../shared/models/student.model';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';
import {AppState} from "../../../shared/state/app.state";
import {Store} from "@ngrx/store";
import {activeSessionSelector} from "../../../shared/state/selectors/users.selector";
import {loadedEnrollments, loadEnrollments} from "../../../shared/state/actions/enrollment.actions";
import {
  enrollmentsListSelector,
  enrollmentsSelector,
  loadEnrollmentsSelector
} from "../../../shared/state/selectors/enrollments.selector";
import {Subscription} from "rxjs";
import {AddEnrollmentDialogComponent} from "../add-enrollment-dialog/add-enrollment-dialog.component";

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css'],
})
export class EnrollmentListComponent implements OnInit {
  public columnsToDisplay: string[];
  public dataSource!: MatTableDataSource<Enrollment>;
  public isLoading!: boolean;
  public isAdmin!: boolean;
  public loggedStudent!: Student;
  private enrollmentSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private enrollmentService: EnrollmentService,
    private dialogRef: MatDialog,
    private authService: AuthenticationService,
    private enrollmentDialogRef: MatDialogRef<EnrollmentListComponent>,
    private store: Store<AppState>
  ) {
    this.columnsToDisplay = [
      'index',
      'enrollDate',
      'student',
      'actions',
    ];
    this.store.select(activeSessionSelector).subscribe(session =>{
      this.isAdmin = session.currentUser.isAdmin;
    });
    this.getEnrollmentData();
  }

  private getEnrollmentData(): void {
    this.store.dispatch(loadEnrollments());
    this.store.select(loadEnrollmentsSelector).subscribe(isLoading =>{
      this.isLoading = isLoading;
      this.dataSource = new MatTableDataSource<Enrollment>(undefined);
    });

    this.setEnrollmentList();

  }

  private setEnrollmentList(): void {
    this.store.select(enrollmentsListSelector).subscribe( enrollments =>{
      this.dataSource = new MatTableDataSource<Enrollment>(enrollments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  private getEnrollmentListByCourse(enrollmentList: Enrollment[]): Enrollment[] {
  return enrollmentList.filter(enrollment => enrollment.Course.name === this.data.name);

  }

  ngOnInit(): void {}

  private initialize(): void {
    this.enrollmentService.get().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  public onDeleteEnrollment(selectedEnrollment: Enrollment): void {
    const deleteDialog = this.dialogRef.open(DeleteWarningDialogComponent, {
      width: '25rem',
      height: '10rem',
      data: 'enrollment',
    });

    deleteDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.enrollmentService
          .delete(selectedEnrollment.id)
          .subscribe((result) => {
            this.getEnrollmentData();
          });
      }
    });
  }

  public onBack(): void{
    this.enrollmentDialogRef.close(null);
  }

  public onEnrollStudent(): void {
    const newStudentEnroll = this.dialogRef.open(AddEnrollmentDialogComponent, {
      width: '28rem',
      height: '17rem',
      data: this.data,
      autoFocus: false
    });

    newStudentEnroll.afterClosed().subscribe(result =>{
      if(result){
        this.getEnrollmentData();
      }
    })

  }
}
