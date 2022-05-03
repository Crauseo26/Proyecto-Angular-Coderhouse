import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Course} from "../../../shared/models/courses.model";
import {Enrollment} from "../../../shared/models/enollment.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EnrollmentService} from "../../../shared/services/enrollment.service";
import {DeleteWarningDialogComponent} from "../../../shared/delete-warning-dialog/delete-warning-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Student} from "../../../shared/models/student.model";
import {AuthenticationService} from "../../../core/auth/services/authentication.service";

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  public columnsToDisplay = ['index', 'enrollDate', 'student', 'course', 'actions'];
  public dataSource!: MatTableDataSource<Enrollment>;
  public loggedStudent: Student;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private enrollmentService: EnrollmentService, private dialogRef: MatDialog, private authService: AuthenticationService) {
    this.Initialize();
    this.loggedStudent = this.authService.getLoggedStudent();
  }

  ngOnInit(): void {
  }

  private Initialize(): void {
    this.enrollmentService.get().subscribe(result =>{
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  public onDeleteCourse(selectedEnrollment: Enrollment): void {
    const deleteDialog = this.dialogRef.open(DeleteWarningDialogComponent, {
      width: '25rem',
      height: '10rem',
      data: 'enrollment'
    })

    deleteDialog.afterClosed().subscribe(result=>{
      if(result && selectedEnrollment.id){
        this.enrollmentService.delete(selectedEnrollment.id).subscribe(result =>{
          this.Initialize();
        });
      }
    });
  }
}
