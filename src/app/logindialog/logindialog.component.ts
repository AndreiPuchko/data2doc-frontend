import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

interface DialogData {
  messageText: string;
  titleText: string;
  email: string;
  okButtonText: string;
}

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {

  public email: string = "";
  constructor(
    public dialogRef: MatDialogRef<LogindialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public closeMe() {
    this.dialogRef.close();
  }

  public loginMe() {
    // alert(this.email);
    this.apiService.sendEmailForLogin(this.email);
    // this.dialogRef.close();
  }

  ngOnInit(): void {
    this.email = this.data.email;
  }

}
