import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from '../api.service';

import { LogindialogComponent } from '../logindialog/logindialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  pos = "end";
  @Input() loggedIn: boolean;
  @Output() checkLoginEvent = new EventEmitter<boolean>();

  constructor(private apiService: ApiService,
    public dialog: MatDialog) {
  }

  private zzLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      'email': this.apiService.getCookie("d2dEmail"),
      'navBarComponent': this,
    };
    if (this.apiService.getCookie("d2dtoken") == "") {
      const dialogRef = this.dialog.open(LogindialogComponent, dialogConfig);
    }
    else {
      // const dialogRef = this.dialog.open(LogindialogComponent, dialogConfig);
      this.checkLoginEvent.emit();
    }
  }


  navBarCommand(command: string) {
    if (command == "C") {
      this.apiService.zzMess("mailto:  info@data2doc.net","Contact us" ,"Close");
      // this.apiService.zzMess("mailto: info@data2doc.net","Contact us" ,"Close");
    }
    else if (command == "O") {
      //logout
      let token = this.apiService.getCookie("d2dtoken");
      this.apiService.logout(token).subscribe(data => {
        if (data['status'] === "You are logged out from data2doc.net") {
          this.apiService.setCookie("d2dtoken", "");
          this.checkLoginEvent.emit();
        }
      }
      )
    }
    else {
      // this.apiService.zzLogin("Command is:" + command, "Command button clicked", "Go on");
      this.zzLogin();
    }
  }
}
