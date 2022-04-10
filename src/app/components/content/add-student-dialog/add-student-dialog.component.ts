import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ADDRESSES, COUNTRY_CODES, GENDERS} from "../../../shared/constants/constants";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
}

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.css']
})
export class AddStudentDialogComponent{

  public newStudentFormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', Validators.email),
    gender: new FormControl(''),
    address: new FormControl(''),
    birthday: new FormControl(''),
    phone: new FormControl('')
  });

  public genders = GENDERS;

  constructor(public dialogRef: MatDialogRef<AddStudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public onBack(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.dialogRef.close(this.newStudentFormGroup.value);
  }

}
