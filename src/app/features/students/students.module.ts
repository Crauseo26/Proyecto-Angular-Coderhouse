import { NgModule } from '@angular/core';
import {StudentTableComponent} from "./student-table/student-table.component";
import {AddStudentDialogComponent} from "./add-student-dialog/add-student-dialog.component";
import {
  StudentDetailDialogComponent
} from "./student-detail-dialog/student-detail-dialog.component";
import {StudentEditDialogComponent} from "./student-edit-dialog/student-edit-dialog.component";
import {
  ChangeProfilePhotoComponent
} from "./student-detail-dialog/change-profile-photo/change-profile-photo.component";
import {SharedModule} from "../../shared/shared.module";
import { StudentsRoutingModule } from './students-routing.module';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    StudentTableComponent,
    AddStudentDialogComponent,
    StudentDetailDialogComponent,
    StudentEditDialogComponent,
    ChangeProfilePhotoComponent,
  ],
  imports: [
    SharedModule,
    StudentsRoutingModule,
    CommonModule
  ]
})
export class StudentsModule { }
