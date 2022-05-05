import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GENDERS } from '../../../shared/constants/constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

class DialogData {}

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.css'],
})
export class AddStudentDialogComponent {
  public newStudentFormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
    birthday: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
  });

  public genders = GENDERS;
  public isVisible = false;

  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public onBack(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.dialogRef.close(this.newStudentFormGroup.value);
  }

  public validateMinLength(requiredControl: string): boolean {
    return (
      this.newStudentFormGroup.controls[requiredControl].hasError(
        'minlength'
      ) &&
      !this.newStudentFormGroup.controls[requiredControl].hasError('required')
    );
  }

  public validateRequired(requiredControl: string): boolean {
    return this.newStudentFormGroup.controls[requiredControl].hasError(
      'required'
    );
  }

  public validateEmail(): boolean {
    return (
      this.newStudentFormGroup.controls['email'].hasError('email') &&
      !this.newStudentFormGroup.controls['email'].hasError('required')
    );
  }

  public togglePasswordVisibility(): void{
    this.isVisible = !this.isVisible;
  }
}
