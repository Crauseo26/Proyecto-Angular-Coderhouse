import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../students/student-table/student-table-datasource";
import {Course} from "../../../shared/models/courses.model";

@Component({
  selector: 'app-courses-edit-dialog',
  templateUrl: './courses-edit-dialog.component.html',
  styleUrls: ['./courses-edit-dialog.component.css']
})
export class CoursesEditDialogComponent implements OnInit {
  public editCourseFormGoup = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required, Validators.minLength(2)]),
    description: new FormControl(this.data.description,[Validators.required, Validators.minLength(15)]),
    startPeriod: new FormControl(this.data.startPeriod, Validators.required),
    endPeriod: new FormControl(this.data.endPeriod, Validators.required),
    capacity: new FormControl(this.data.capacity,[Validators.required, Validators.min(5)]),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: Course, private dialogRef: MatDialogRef<CoursesEditDialogComponent>) { }

  ngOnInit(): void {
  }

  public onSubmit(): void{
    this.dialogRef.close(this.editCourseFormGoup.value);
  }

  public onBack(): void{
    this.dialogRef.close(null);
  }

  public validateMinLength(requiredControl: string): boolean {
    return this.editCourseFormGoup.controls[requiredControl].hasError('minlength') && !this.editCourseFormGoup.controls[requiredControl].hasError('required');
  }

  public validateRequired(requiredControl: string): boolean {
    return this.editCourseFormGoup.controls[requiredControl].hasError('required');
  }

  validateMinValue(requiredControl: string) {
    return this.editCourseFormGoup.controls[requiredControl].hasError('min') && !this.editCourseFormGoup.controls[requiredControl].hasError('required');
  }
}
