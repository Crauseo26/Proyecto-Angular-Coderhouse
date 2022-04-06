import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddStudentDialogComponent} from "./add-student-dialog/add-student-dialog.component";
import {StudentTableComponent} from "./student-table/student-table.component";
import {Student} from "./student-table/student-table-datasource";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @ViewChild(StudentTableComponent) studentTable!: StudentTableComponent;
  private nextId!: number;

  constructor(private addStudentDialog: MatDialog) {
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
    return this.studentTable.dataSource.data.length + 2;
  }
}
