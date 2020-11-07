import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
  constructor(private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  private zzLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      'email': "info@data2doc.net",
    };
    const dialogRef = this.dialog.open(LogindialogComponent, dialogConfig);
  }


  navBarCommand(command: string) {
    if (command == "C") {
      this.apiService.zzMess("Command is:" + command, "Command button clicked", "Go on");
    }
    else {
      // this.apiService.zzLogin("Command is:" + command, "Command button clicked", "Go on");
      this.zzLogin();
    }
  }
}
