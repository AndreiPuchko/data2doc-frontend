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
    // this.cookieConsent();
  }

  cookieConsent (){
    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#164969"
        },
        button: {
          background: "#ffe000",
          text: "#164969"
        }
      },
      theme: "classic",
      content: {
        message: "This website uses cookies to store personal data (only your email address) for your automatic login. ",
        dismiss: "Everything is clear, I agree ",
        link: "What are cookies?",
        // href: environment.Frontend + "/dataprivacy" 
      }
    });

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
          else {
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
    if (this.filesDz.length === 2) {
      let fd: FormData = new FormData();
      for (let i = 0; i < this.filesDz.length; i++) {
        fd.append('file', this.filesDz[i], this.filesDz[i].name);
      }
      this.apiService.zzWaitShow();
      this.apiService.sendFiles(fd, d2dtoken).subscribe(
        data => {
          if (data['text'] == "files sent successfully") {
            this.downloadResult(data['url4download']);//getting result
          }
          else {
            this.apiService.zzMess(data['text'])
          }
        },
        error => {
          console.log('files upload failed');
          this.apiService.zzWaitClose();
        },
        () => {
          //
        }
      );
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
    let fileType = file_object.name.slice(-4).toLowerCase();
    if (['json', 'xlsx', 'docx'].indexOf(fileType) >= 0) {
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