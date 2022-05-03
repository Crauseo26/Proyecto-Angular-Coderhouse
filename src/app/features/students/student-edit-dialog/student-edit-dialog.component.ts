import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GENDERS} from "../../../shared/constants/constants";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../../shared/models/student.model";

@Component({
  selector: 'app-student-edit-dialog',
  templateUrl: './student-edit-dialog.component.html',
  styleUrls: ['./student-edit-dialog.component.css']
})
export class StudentEditDialogComponent implements OnInit {
  public editStudentFormGroup = new FormGroup({
    firstName: new FormControl(this.data.firstName, [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl(this.data.lastName,[Validators.required, Validators.minLength(3)]),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
    password: new FormControl(this.data.password, Validators.required),
    gender: new FormControl(this.data.gender, Validators.required),
    address: new FormControl(this.data.address,[Validators.required, Validators.minLength(11)]),
    birthday: new FormControl(this.data.birthday, Validators.required),
    phone: new FormControl(this.data.phone, [Validators.required, Validators.minLength(9)])
  });
  public genders = GENDERS;
  public isVisible = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Student, private dialogRef: MatDialogRef<StudentEditDialogComponent>) { }

  ngOnInit(): void {
  }

  public onSubmit(): void{
    this.dialogRef.close(this.editStudentFormGroup.value);
  }

  public onBack(): void{
    this.dialogRef.close(null);
  }

  public validateMinLength(requiredControl: string): boolean {
    return this.editStudentFormGroup.controls[requiredControl].hasError('minlength') && !this.editStudentFormGroup.controls[requiredControl].hasError('required');
  }

  public validateRequired(requiredControl: string): boolean {
    return this.editStudentFormGroup.controls[requiredControl].hasError('required');
  }

  public validateEmail(): boolean {
    return this.editStudentFormGroup.controls['email'].hasError('email') && !this.editStudentFormGroup.controls['email'].hasError('required');
  }

  public togglePasswordVisibility(): void{
    this.isVisible = !this.isVisible;
  }
}
