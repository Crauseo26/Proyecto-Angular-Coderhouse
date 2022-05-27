import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  public isVisible = false;
  public addUserFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    avatarURL: new FormControl('')
  });

  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>) { }

  ngOnInit(): void {
  }

  public validateMinLength(requiredControl: string): boolean {
    return this.addUserFormGroup.controls[requiredControl]?.hasError('minlength') && !this.addUserFormGroup.controls[requiredControl]?.hasError('required');
  }

  public validateRequired(requiredControl: string): boolean {
    return this.addUserFormGroup.controls[requiredControl]?.hasError('required');
  }

  public togglePasswordVisibility(): void{
    this.isVisible = !this.isVisible;
  }

  public onSubmit(): void{
    this.dialogRef.close(this.addUserFormGroup.value);
  }

  public onBack(): void{
    this.dialogRef.close(null);
  }


}
