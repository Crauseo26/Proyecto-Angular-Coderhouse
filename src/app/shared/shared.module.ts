import { NgModule } from '@angular/core';
import {StudentRecognitionDirective} from "./directives/student-recognition.directive";
import {TooltipDirective} from "./directives/tooltip.directive";
import {StudentNamesPipe} from "./pipes/student-names.pipe";
import {MaterialModule} from "./material/material.module";

@NgModule({
  declarations: [
    StudentRecognitionDirective,
    TooltipDirective,
    StudentNamesPipe
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    StudentRecognitionDirective,
    TooltipDirective,
    StudentNamesPipe,
    MaterialModule
  ]
})
export class SharedModule { }
