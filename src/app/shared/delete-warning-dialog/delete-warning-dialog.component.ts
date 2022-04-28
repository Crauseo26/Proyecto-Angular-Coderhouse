import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface DialogData {
}

@Component({
  selector: 'app-delete-warning-dialog',
  templateUrl: './delete-warning-dialog.component.html',
  styleUrls: ['./delete-warning-dialog.component.css']
})
export class DeleteWarningDialogComponent implements OnInit {

  public item = 'item';

  constructor(public dialogRef: MatDialogRef<DeleteWarningDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  public onBack(): void {
    this.dialogRef.close();
  }

  public onDelete(): void {
    this.dialogRef.close(true);
  }
}
