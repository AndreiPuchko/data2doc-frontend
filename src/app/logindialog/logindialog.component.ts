import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

interface DialogData {
  messageText: string;
  titleText: string;
  email: string;
  navBarComponent: any;
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

  private sendEmailDone(data) {
    if (!data['status'].startsWith("Error")) {
      this.apiService.setCookie("d2dtoken", data['key']);
      this.apiService.setCookie("d2dEmail", this.email);
      this.dialogRef.close();
      this.data['navBarComponent'].checkLoginEvent.emit();
      this.apiService.zzMess(data['status'], "Sucsess");
    }
    else {
      this.apiService.zzMess("Wrong Email, it was not sent! Check it and try again", "Attention");
    }

  }
  public loginMe() {
    this.apiService.sendEmailForLogin(this.email).
      subscribe(data => this.sendEmailDone(data));

  }

  ngOnInit(): void {
    this.email = this.data.email;
  }

}
