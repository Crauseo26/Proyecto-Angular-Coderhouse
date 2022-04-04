import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ADDRESSES, COUNTRY_CODES} from "../../../shared/constants/constants";
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
    fullName: new FormControl(''),
    address: new FormControl(''),
    birthday: new FormControl(''),
    phone: new FormControl('')
  });

  public fullNameInput = this.newStudentFormGroup.controls['fullName'];
  public addressInput = this.newStudentFormGroup.controls['address'];
  public birthdayInput = this.newStudentFormGroup.controls['birthday'];
  public phoneInput = this.newStudentFormGroup.controls['phone'];
  public selectedCode: number;
  public phonePlaceholder: string;
  public codes = COUNTRY_CODES;
  public addresses = ADDRESSES;

  constructor(public dialogRef: MatDialogRef<AddStudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.selectedCode = 598;
    this.phonePlaceholder = '';
  }

  public onBack(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.dialogRef.close(this.newStudentFormGroup.value);
  }

  public onSelectedAddress(): void{
    console.log("selection change");
    const selectedValue = this.newStudentFormGroup.controls['address'].value;
    console.log("value " +  selectedValue.country);
    let selectedCountryCode = "";

    if(selectedValue.country === "Uruguay"){
      selectedCountryCode = "+598";
    }else if(selectedValue.country === "Chile"){
      selectedCountryCode = "+56";
    }else if(selectedValue.country === "Argentina"){
      selectedCountryCode = "+54";
    } else if(selectedValue.country === "Venezuela"){
      selectedCountryCode = "+58";
    }

    console.log("code: " + selectedCountryCode);
    this.newStudentFormGroup.controls['phone'].setValue(selectedCountryCode);
  }
}
