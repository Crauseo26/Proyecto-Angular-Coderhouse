import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  public isVisible = false;
  public editUserFormGroup = new FormGroup({
    username: new FormControl(this.data.username, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(this.data.password, [Validators.required, Validators.minLength(5)]),
    avatarURL: new FormControl(this.data.avatar)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private dialogRef: MatDialogRef<EditUserDialogComponent>) { }

  ngOnInit(): void {
  }

  public validateMinLength(requiredControl: string): boolean {
    return this.editUserFormGroup.controls[requiredControl]?.hasError('minlength') && !this.editUserFormGroup.controls[requiredControl]?.hasError('required');
  }

  public validateRequired(requiredControl: string): boolean {
    return this.editUserFormGroup.controls[requiredControl]?.hasError('required');
  }

  public togglePasswordVisibility(): void{
    this.isVisible = !this.isVisible;
  }

  public onSubmit(): void{
    const updatedUser: User = {
      ...this.data,
      username: this.editUserFormGroup.controls['username'].value,
      password: this.editUserFormGroup.controls['password'].value,
      avatar: this.editUserFormGroup.controls['avatarURL'].value
    }
    this.dialogRef.close(updatedUser);
  }

  public onBack(): void{
    this.dialogRef.close(null);
  }
}
