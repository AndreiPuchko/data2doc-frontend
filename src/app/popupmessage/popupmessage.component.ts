import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  messageText: string;
  titleText: string;
  okButtonText: string;
}

@Component({
  selector: 'app-popupmessage',
  templateUrl: './popupmessage.component.html',
  styleUrls: ['./popupmessage.component.css']
})

export class PopupmessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupmessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public closeMe() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
