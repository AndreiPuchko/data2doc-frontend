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

  constructor(private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.downloadExampleFiles();
    this.getProcessedFilesCounter();
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
    if (this.filesDz.length === 2) {
      this.apiService.zzWaitShow();
      let fd: FormData = new FormData();
      for (let i = 0; i < this.filesDz.length; i++) {
        fd.append('file', this.filesDz[i], this.filesDz[i].name);
      }
      // console.log(fd);
      this.apiService.sendFiles(fd).subscribe(
        data => {
          console.log('files sent successfully');
          this.downloadResult(data['key']);
        },
        error => {
          console.log('failed files download');
          this.apiService.waitWindow.close();
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
    // var fileType:string;
    let fileType = file_object.name.slice(-4).toLowerCase();
    for (let i = 0; i < this.filesDz.length; i++) {
      if (fileType === this.filesDz[i].name.slice(-4).toLowerCase())
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