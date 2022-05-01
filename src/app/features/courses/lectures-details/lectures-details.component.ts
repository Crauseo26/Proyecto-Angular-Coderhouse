import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Student} from "../../students/student-table/student-table-datasource";
import {Lecture} from "../../../shared/models/lecture.model";

@Component({
  selector: 'app-lectures-details',
  templateUrl: './lectures-details.component.html',
  styleUrls: ['./lectures-details.component.css']
})
export class LecturesDetailsComponent implements OnInit {
  public dataSource: Lecture[] = [];
  public columnsToDisplay = ['index', 'name', 'summary'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Lecture[]) {
    this.initialize();
  }

  ngOnInit(): void {
  }

  private initialize() {
    this.dataSource = this.data;
  }

  public getIndex(element: Lecture): number {

    return this.dataSource.indexOf(element) + 1;

  }
}
