import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GENDERS} from "../../../shared/constants/constants";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../student-table/student-table-datasource";

@Component({
  selector: 'app-student-edit-dialog',
  templateUrl: './student-edit-dialog.component.html',
  styleUrls: ['./student-edit-dialog.component.css']
})
export class StudentEditDialogComponent implements OnInit {
  public editStudentFormGroup = new FormGroup({
    firstName: new FormControl(this.data.firstName),
    lastName: new FormControl(this.data.lastName),
    email: new FormControl(this.data.email, Validators.email),
    gender: new FormControl(this.data.gender),
    address: new FormControl(this.data.address),
    birthday: new FormControl(this.data.birthday),
    phone: new FormControl(this.data.phone)
  });
  public genders = GENDERS;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Student, private dialogRef: MatDialogRef<StudentEditDialogComponent>) { }

  ngOnInit(): void {
  }

  public onSubmit(): void{

    this.dialogRef.close(this.editStudentFormGroup.value);
  }

  public onBack(): void{
    this.dialogRef.close(null);
  }

}
