import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddStudentDialogComponent} from "./add-student-dialog/add-student-dialog.component";
import {StudentTableComponent} from "./student-table/student-table.component";
import {Student} from "./student-table/student-table-datasource";
import {ContentRendererService} from "../../shared/services/content-renderer.service";
import {COURSES_CONTENT, LECTURES_CONTENT, STUDENT_CONTENT} from "../../shared/constants/constants";
import {StudentService} from "../../shared/services/student.service";
import {StudentDetailDialogComponent} from "./student-detail-dialog/student-detail-dialog.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @ViewChild(StudentTableComponent) studentTable!: StudentTableComponent;
  private nextId!: number
  public studentContent: boolean = true;
  public coursesContent: boolean = false;
  public lecturesContent: boolean = false;

  constructor(private matDialog: MatDialog, private contentRendererService: ContentRendererService, private studentService: StudentService) {
    this.contentRendererService.content.subscribe(response => {
      this.resetContent();
      this.setContentActive(response);
    })
  }

  ngOnInit(): void {
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
        average: (Math.random() * (99 - 45 + 1)) + 45,
        absences: (Math.random() * (8 - 1 + 1)) + 1,
      }
      this.studentTable.addStudent(newStudent);
    });

  }

  private getNextId(): number {
    return this.studentTable.dataSource.data.length + 1;
  }

  private setContentActive(selectedContent: number): void {
    if(selectedContent == STUDENT_CONTENT){
      this.studentContent = true;
    }
    else if(selectedContent == COURSES_CONTENT){
      this.coursesContent = true;
    }
    else if (selectedContent == LECTURES_CONTENT){
      this.lecturesContent = true;
    }
    else{
      this.studentContent = true;
    }
  }

  private resetContent(): void {
    this.studentContent = false;
    this.coursesContent = false;
    this.lecturesContent = false;
  }
}
