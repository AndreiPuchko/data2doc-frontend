import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
// import { environment } from '../environments/environment';
// import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend';
  filesDz: File[] = [];
  // baseUrl = environment.baseUrl;

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.downloadSampleFiles();
  }

  downloadFile(blob:File){
    let url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = blob.name;
    anchor.href = url;
    anchor.click();        
  }

  downloadResult(key){
    this.apiService.downloadResultFile(key).subscribe(data => {
        let blob = new File([data], "result.docx");
        this.downloadFile(blob);
      },error=>{console.log("result file downloading error")});
  }

  data2doc(){
    let fd: FormData = new FormData();
    for (let i = 0; i < this.filesDz.length; i++){
      fd.append('file', this.filesDz[i], this.filesDz[i].name);
    }
    this.apiService.sendFiles(fd).subscribe(
      data => {
                console.log('files sent successfully');
                this.downloadResult(data['key']);
              },
      error => {
                console.log('failed files download');
              },
      () => {
            //
            }
    );    
    }

  downloadSample(filetype:string){
    this.apiService.downloadSampleFile(filetype).subscribe(data=>{
      let blob = new File([data], "sample."+filetype);
      this.downloadFile(blob);      
      // let url = window.URL.createObjectURL(blob);
      // window.location.href = url;
      // window.location.assign(url);
    })
  }

  dropSampleFileContent(fileContent:string,filetype:string){
    // console.log(atob(fileContent));
    let file_object = new File([fileContent], 'sample.'+filetype, { type: filetype, lastModified:Date.now()});
    this.dropFile(file_object);
  }

  getSample(filetype:string){
    this.apiService.downloadSampleFile(filetype).subscribe(data =>this.dropSampleFileContent(data,filetype),error=> console.log("Download sample file error!"));
  }

  downloadSampleFiles(){
    // this.getSample("txt");
    this.getSample("xlsx");
    this.getSample("docx");
  }

  dropFile(file_object:File) {
    var fileType;
    fileType = file_object.name.slice(-4).toLowerCase();
    for (let i = 0; i < this.filesDz.length; i++){
      if (fileType===this.filesDz[i].name.slice(-4).toLowerCase())
        this.filesDz.splice(i,1);
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