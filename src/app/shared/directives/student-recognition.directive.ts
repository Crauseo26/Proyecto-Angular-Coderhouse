import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {EXCELLENT_STUDENT_THRESHOLD, FAILED_STUDENT_THRESHOLD} from "../constants/constants";
import {Student} from "../../features/students/student-table/student-table-datasource";

@Directive({
  selector: '[studentRecognition]'
})
export class StudentRecognitionDirective implements OnInit{

  @Input() public student!: Student;

  constructor(private htmlElement: ElementRef, private renderer: Renderer2) {

  }

  public ngOnInit():void{
    if(this.student){
      if(this.student.average > EXCELLENT_STUDENT_THRESHOLD){
        this.renderer.setStyle(this.htmlElement.nativeElement, 'background-color', '#85D3A972');
        this.renderer.setStyle(this.htmlElement.nativeElement, 'font-weight', '500');
      } else if(this.student.average < FAILED_STUDENT_THRESHOLD){
        this.renderer.setStyle(this.htmlElement.nativeElement, 'background-color', '#F6728C72');
      }
    }
  }

}
