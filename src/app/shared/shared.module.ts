import { NgModule } from '@angular/core';
import {StudentRecognitionDirective} from "./directives/student-recognition.directive";
import {TooltipDirective} from "./directives/tooltip.directive";
import {StudentNamesPipe} from "./pipes/student-names.pipe";
import {MaterialModule} from "./material/material.module";
import {DeleteWarningDialogComponent} from "./delete-warning-dialog/delete-warning-dialog.component";
import { TeacherNamesPipe } from './pipes/teacher-names.pipe';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";

@NgModule({
  declarations: [
    StudentRecognitionDirective,
    TooltipDirective,
    StudentNamesPipe,
    DeleteWarningDialogComponent,
    TeacherNamesPipe,
  ],
  imports: [
    MaterialModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    StudentRecognitionDirective,
    TooltipDirective,
    StudentNamesPipe,
    TeacherNamesPipe,
    DeleteWarningDialogComponent,
    MaterialModule,
    NgxMatSelectSearchModule
  ]
})
export class SharedModule { }
