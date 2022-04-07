import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddStudentDialogComponent} from "./add-student-dialog/add-student-dialog.component";
import {StudentTableComponent} from "./student-table/student-table.component";
import {Student} from "./student-table/student-table-datasource";
import {ContentRendererService} from "../../shared/services/content-renderer.service";
import {COURSES_CONTENT, LECTURES_CONTENT, STUDENT_CONTENT} from "../../shared/constants/constants";

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

  constructor(private addStudentDialog: MatDialog, private contentRendererService: ContentRendererService) {
    this.contentRendererService.content.subscribe(response => {
      console.log('recibi el valor: ' + response);
      this.resetContent();
      this.setContentActive(response);
    })
  }

  ngOnInit(): void {
  }

  public onAddStudent(): void {
    const matDialog = this.addStudentDialog.open(AddStudentDialogComponent);

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
        absences: result.absences
      }
      this.studentTable.dataSource.data.push(newStudent);
      this.studentTable.refresh();
    });

  }

  private getNextId(): number {
    return this.studentTable.dataSource.data.length + 1;
  }

  private setContentActive(selectedContent: number): void {
    if(selectedContent == STUDENT_CONTENT){
      console.log('student option clicked');
      this.studentContent = true;
    }
    else if(selectedContent == COURSES_CONTENT){
      console.log('courses option clicked');
      this.coursesContent = true;
    }
    else if (selectedContent == LECTURES_CONTENT){
      console.log('lectures option clicked');
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
