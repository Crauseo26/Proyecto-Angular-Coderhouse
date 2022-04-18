import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Student} from "../student-table/student-table-datasource";
import {ChangeProfilePhotoComponent} from "./change-profile-photo/change-profile-photo.component";

@Component({
  selector: 'app-student-detail-dialog',
  templateUrl: './student-detail-dialog.component.html',
  styleUrls: ['./student-detail-dialog.component.css']
})
export class StudentDetailDialogComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public data: Student) {}

  public getFullName():string {
    return this.data.lastName + ', ' + this.data.firstName;
  }
}
