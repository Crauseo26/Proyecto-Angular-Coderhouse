import { NgModule } from '@angular/core';
import {StudentRecognitionDirective} from "./directives/student-recognition.directive";
import {TooltipDirective} from "./directives/tooltip.directive";
import {StudentNamesPipe} from "./pipes/student-names.pipe";
import {MaterialModule} from "./material/material.module";
import {DeleteWarningDialogComponent} from "./delete-warning-dialog/delete-warning-dialog.component";

@NgModule({
  declarations: [
    StudentRecognitionDirective,
    TooltipDirective,
    StudentNamesPipe,
    DeleteWarningDialogComponent,
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    StudentRecognitionDirective,
    TooltipDirective,
    StudentNamesPipe,
    DeleteWarningDialogComponent,
    MaterialModule
  ]
})
export class SharedModule { }
