import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface DialogData {
  messageText: string;
  titleText: string;
  okButtonText: string;
}

@Component({
  selector: 'wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.css']
})

export class WaitComponent {
  // Add these three lines above the constructor entry.

  constructor(private dialogRef: MatDialogRef<WaitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

}