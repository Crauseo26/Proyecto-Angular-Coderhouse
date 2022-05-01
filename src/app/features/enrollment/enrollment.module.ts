import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import {SharedModule} from "../../shared/shared.module";
import {EnrollmentRoutingModule} from "./enrollment.routing.module";



@NgModule({
  declarations: [
    EnrollmentListComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    SharedModule
  ],
  exports:[
    EnrollmentListComponent
  ]
})
export class EnrollmentModule { }
