import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import {SharedModule} from "../../shared/shared.module";
import {EnrollmentRoutingModule} from "./enrollment.routing.module";
import { AddEnrollmentDialogComponent } from './add-enrollment-dialog/add-enrollment-dialog.component';



@NgModule({
  declarations: [
    EnrollmentListComponent,
    AddEnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    SharedModule
  ],
  exports:[
    EnrollmentListComponent,
    AddEnrollmentDialogComponent
  ]
})
export class EnrollmentModule { }
