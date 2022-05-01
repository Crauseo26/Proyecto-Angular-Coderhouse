import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../shared/models/courses.model";

@Component({
  selector: 'app-add-courses-dialog',
  templateUrl: './add-courses-dialog.component.html',
  styleUrls: ['./add-courses-dialog.component.css']
})
export class AddCoursesDialogComponent implements OnInit {

  public addCourseFormGoup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('',[Validators.required, Validators.minLength(15)]),
    startPeriod: new FormControl('', Validators.required),
    endPeriod: new FormControl('', Validators.required),
    capacity: new FormControl('',[Validators.required, Validators.min(5)]),
  });

  constructor(private dialogRef: MatDialogRef<AddCoursesDialogComponent>) { }

  ngOnInit(): void {
  }

  public onSubmit(): void{
    this.dialogRef.close(this.addCourseFormGoup.value);
  }

  public onBack(): void{
    this.dialogRef.close(null);
  }

  public validateMinLength(requiredControl: string): boolean {
    return this.addCourseFormGoup.controls[requiredControl].hasError('minlength') && !this.addCourseFormGoup.controls[requiredControl].hasError('required');
  }

  public validateRequired(requiredControl: string): boolean {
    return this.addCourseFormGoup.controls[requiredControl].hasError('required');
  }

  validateMinValue(requiredControl: string) {
    return this.addCourseFormGoup.controls[requiredControl].hasError('min') && !this.addCourseFormGoup.controls[requiredControl].hasError('required');
  }

}
