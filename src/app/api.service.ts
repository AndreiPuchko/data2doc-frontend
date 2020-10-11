import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatDialog, MatDialogConfig,MatDialogRef } from '@angular/material/dialog';

import { PopupmessageComponent } from './popupmessage/popupmessage.component';
import { WaitComponent } from './wait/wait.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = environment.baseUrl;
  file_data: any;
  waitWindow: MatDialogRef<WaitComponent>;
  
  constructor(private http: HttpClient,
    public dialog: MatDialog) { }

  public downloadResultFile(key: string): any {
    return this.http.get(this.apiURL + "result/" + key, { responseType: 'blob' });
  }

  public downloadExampleFile(filetype: string): any {
    return this.http.get(this.apiURL + "examplefile/" + filetype, { responseType: 'blob' });
  }

  public sendFiles(fd) {
    return this.http.post<any>(this.apiURL + "data2doc", fd);
  }

  public getRowCount() {
    return this.http.get(this.apiURL + "rowcount", {});
  }

  public zzMess(text: string, titleText: string = "Message", okButtonText: string = "Ok") {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      'messageText': text,
      'titleText': titleText,
      'okButtonText': okButtonText
    };
    const dialogRef = this.dialog.open(PopupmessageComponent, dialogConfig);
  }

  public zzWaitShow(text: string = "Processing", titleText: string = "Wait",
    okButtonText: string = "Ok") {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      'messageText': text,
      'titleText': titleText,
      'okButtonText': okButtonText
    };
    const dialogRef = this.dialog.open(WaitComponent, dialogConfig);
    this.waitWindow=dialogRef;
  }

  public zzWaitClose() {
    if (this.waitWindow){
      this.waitWindow.close()
    }
  }
}