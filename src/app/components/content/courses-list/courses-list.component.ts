import { Component, OnInit } from '@angular/core';
import {CoursesService} from "../../../shared/services/courses.service";
import {Course} from "../../../shared/models/courses.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  public courses!: Observable<Course[] | undefined>;
  public imgUrl!: any[];
  public serviceError!: string;

  constructor(private courseService: CoursesService) {
    this.courses = courseService.get();
    courseService.getCorusePhoto().subscribe(response => {
     this.imgUrl = response.results;
      console.log(this.imgUrl);
    });
  }

  ngOnInit(): void {
  //   this.courseService.get().subscribe(
  // response => {
  //     if(response){
  //       this.courses = response
  //     }
  //   },
  //   error => {
  //     this.serviceError = `Sorry. Can't get the Courses info, please try again.`
  //   });
  }

}
