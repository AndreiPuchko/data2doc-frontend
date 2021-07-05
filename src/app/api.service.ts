import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

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
    private cookieService: CookieService,
    public dialog: MatDialog) { }

  public getCookie(name: string) {
    return "123"
    return this.cookieService.get(name);
  }

  public setCookie(name: string, value: string) {
    return "123"
    let expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + 36500);
    return this.cookieService.set(name, value, expiredDate);
  }

  public downloadResultFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' });
  }
  public downloadExampleFile(filetype: string): any {
    return this.http.get(this.apiURL + "examplefile/" + filetype, { responseType: 'blob' });
  }

  public downloadGoogleSheetFile(fileId: string): any {
    return this.http.get("https://docs.google.com/spreadsheets/d/"+fileId+"/export?exportFormat=xlsx", 
            { responseType: 'blob' });
  }

  public downloadGoogleDocFile(fileId: string): any {
    return this.http.get("https://docs.google.com/document/d/"+fileId+"/export?exportFormat=docx", 
            { responseType: 'blob' });
  }

  public sendFiles(fd, d2dtoken) {
    const httpOptions = {
      headers: new HttpHeaders({
        "d2dtoken": d2dtoken
      })
    };

    return this.http.post<any>(this.apiURL + "data2doc", fd, httpOptions);
  }

  public getRowCount() {
    return this.http.get(this.apiURL + "rowcount", {});
  }

  public checkLogin(token: string) {
    return this.http.get(this.apiURL + "checklogin/" + token, {});
  }

  public logout(token: string) {
    return this.http.get(this.apiURL + "logout/" + token, {});
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
    this.zzWaitClose();
    const dialogRef = this.dialog.open(PopupmessageComponent, dialogConfig);
  }

  public sendEmailForLogin(email: string) {
    let fd: FormData = new FormData();
    fd.append("email", email)
    return this.http.post(this.apiURL + "sendloginmail", fd);
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
    this.waitWindow = dialogRef;
  }

  public zzWaitClose() {
    if (this.waitWindow) {
      this.waitWindow.close()
    }
  }
}