import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'data2doc.net';
  rowCount = 0;
  filesDz: File[] = [];
  loggedIn: boolean;

  constructor(private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.checkLogin();
    this.downloadExampleFiles();
    this.getProcessedFilesCounter();
  }

  checkLogin() {
    let token = this.apiService.getCookie("d2dtoken");
    if (token == "") {
      this.loggedIn = false;
    }
    else {
      this.apiService.checkLogin(token).
        subscribe(data => {
          this.loggedIn = false;
          if (data['status'] == "logged") {
            this.loggedIn = true;
          }
          else if (data['status'] == "bad token") {
            this.apiService.setCookie("d2dtoken", "")
          }
        })
    }
  }

  getProcessedFilesCounter() {
    this.apiService.getRowCount().subscribe(data => {
      this.rowCount = data['rowCount'];
    }
    )
  }

  downloadFile(blob: File) {
    let url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    this.apiService.zzWaitClose();
    anchor.download = blob.name;
    anchor.href = url;
    anchor.click();
  }

  downloadResult(key) {
    this.apiService.downloadResultFile(key).subscribe(data => {
      let blob = new File([data], "result.docx");
      this.downloadFile(blob);
      this.getProcessedFilesCounter();
    },
      error => { console.log("result file downloading error") });
  }

  data2doc() {
    const d2dtoken = this.apiService.getCookie("d2dtoken")
    const maxSize = 20480;
    const maxRowsCount = 50;
    let filesSize = 0;
    if (this.filesDz.length === 2) {
      let fd: FormData = new FormData();
      for (let i = 0; i < this.filesDz.length; i++) {
        fd.append('file', this.filesDz[i], this.filesDz[i].name);
        filesSize += this.filesDz[i].size;
      }
      if (d2dtoken != "" || filesSize <= maxSize) {
        this.apiService.zzWaitShow();
        this.apiService.sendFiles(fd, d2dtoken).subscribe(
          data => {
            if (data['text'] == "files sent successfully") {
              if (d2dtoken != "" || parseInt(data['dataRowsCount']) <= maxRowsCount) {
                this.downloadResult(data['key']);//getting result
              }
              else {
                this.apiService.zzMess("Total data rows limit exeeded! No more than " +
                  maxRowsCount.toString() + " rows without registration." +
                  "Please, login please to get full service");
              }
            }
            else {
              this.apiService.zzMess("Something went wrong")
            }
          },
          error => {
            console.log('files upload failed');
            // this.apiService.waitWindow.close();
            this.apiService.zzWaitClose();
          },
          () => {
            //
          }
        );
      }
      else {
        this.apiService.zzMess("Files size exeeded! No more than " +
          maxSize.toString() + " bytes without registration." +
          "Please, login to get full service");
      }
      console.log(filesSize);
    }
    else {
      this.apiService.zzMess("I need 2 files", "Not enough data!", "Go on");
    }
  }

  downloadExample(filetype: string) {
    this.apiService.downloadExampleFile(filetype).subscribe(data => {
      let blob = new File([data], "example." + filetype);
      this.downloadFile(blob);
    })
  }

  dropExampleFileContent(fileContent: string, filetype: string) {
    let file_object = new File([fileContent], 'example.' + filetype, { type: filetype, lastModified: Date.now() });
    this.dropFile(file_object);
  }

  getExample(filetype: string) {
    this.apiService.downloadExampleFile(filetype).subscribe(data => this.dropExampleFileContent(data, filetype), error => console.log("Download example file error!"));
  }

  downloadExampleFiles() {
    this.getExample("xlsx");
    this.getExample("docx");
  }

  dropFile(file_object: File) {
    // var fileType:string;
    let fileType = file_object.name.slice(-4).toLowerCase();
    for (let i = 0; i < this.filesDz.length; i++) {
      let existFileType = this.filesDz[i].name.slice(-4).toLowerCase()
      if (fileType === existFileType ||
        (fileType === "json" && existFileType === "xlsx") ||
        (fileType === "xlsx" && existFileType === "json")
      )
        this.filesDz.splice(i, 1);
    }
    this.filesDz.push(file_object)
  }

  onSelectDz(event) {
    for (let i = 0; i < event.addedFiles.length; i++) {
      this.dropFile(event.addedFiles[i]);
    }
  }

  onRemoveDz(event) {
    this.filesDz.splice(this.filesDz.indexOf(event), 1);
  }
}