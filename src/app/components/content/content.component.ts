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
  private randomId: number =  Math.floor(Math.random()*1001);

  constructor(private addStudentDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public onAddStudent(): void {
    const matDialog = this.addStudentDialog.open(AddStudentDialogComponent);

    matDialog.afterClosed().subscribe(result => {
      let newStudent: Student = {
        id: this.randomId,
        fullName: result.fullName,
        address: result.address,
        birthday: result.birthday,
        phone: result.phone,
        average: (Math.random() * (99 - 45 + 1)) + 45
      }
      this.studentTable.dataSource.data.push( newStudent);
      this.studentTable.refresh();
    });

  }

}
