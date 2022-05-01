import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {CoursesListComponent} from "./courses-list/courses-list.component";
import { LecturesDetailsComponent } from './lectures-details/lectures-details.component';
import { CoursesEditDialogComponent } from './courses-edit-dialog/courses-edit-dialog.component';
import { AddCoursesDialogComponent } from './add-courses-dialog/add-courses-dialog.component';



@NgModule({
  declarations: [
    CoursesListComponent,
    LecturesDetailsComponent,
    CoursesEditDialogComponent,
    AddCoursesDialogComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
