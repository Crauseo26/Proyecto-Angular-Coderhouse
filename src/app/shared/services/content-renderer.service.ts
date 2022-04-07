import { Injectable } from '@angular/core';
import {COURSES_CONTENT, LECTURES_CONTENT, STUDENT_CONTENT} from "../constants/constants";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentRendererService {

  private activeContent = new BehaviorSubject<number>(1);
  public content = this.activeContent.asObservable();

  constructor() { }

  public setActiveContent(selectedOption: string): void{

    if (selectedOption === 'Students') {
      this.activeContent.next(STUDENT_CONTENT);
    } else if (selectedOption === 'Courses') {
      this.activeContent.next(COURSES_CONTENT);
    } else if (selectedOption === 'Lectures') {
      this.activeContent.next(LECTURES_CONTENT);
    } else {
      this.activeContent.next(STUDENT_CONTENT);
    }
  }
}
