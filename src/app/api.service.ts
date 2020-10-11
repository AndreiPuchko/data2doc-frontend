import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatDialog} from '@angular/material/dialog';

import { PopupmessageComponent } from './popupmessage/popupmessage.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = environment.baseUrl;
  file_data: any;
  constructor(private http: HttpClient,
    public dialog: MatDialog) {}

  public downloadResultFile(key:string): any {
		return this.http.get(this.apiURL+"result/"+key, {responseType: 'blob'});
  }

  public downloadExampleFile(filetype:string): any {
		return this.http.get(this.apiURL+"examplefile/"+filetype, {responseType: 'blob'});
  }

  public sendFiles(fd) {
    return this.http.post<any>(this.apiURL+"data2doc", fd);
  }

  public getRowCount() {
    return this.http.get(this.apiURL+"rowcount",{});
  }

  public zzMess(text: string, titleText: string = "Message", okButtonText: string = "Ok") {
    const dialogRef = this.dialog.open(PopupmessageComponent, {
      width: '20%',
      data: {
        'messageText': text,
        'titleText': titleText,
        'okButtonText': okButtonText
      }
    });
  }


}