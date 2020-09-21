import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../environments/environment';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend';
  filesDz: File[] = [];
  baseUrl = environment.baseUrl;

  constructor(private apiService: ApiService,private http: HttpClient){}

  ngOnInit(){
    this.downloadSampleFiles();
  }

  sampleDocx(){
    this.apiService.downloadSampleFileContent("docx").subscribe(data=>{
      let blob = new File([data], "sample.docx");
      let url = window.URL.createObjectURL(blob);
      window.location.href = url;
    })
  }
  sampleXlsx(){
    this.apiService.downloadSampleFileContent("xlsx").subscribe(data=>{
      let blob = new File([data], "sample.xlsx");
      let url = window.URL.createObjectURL(blob);
      window.location.href = url;
    })
  }


  downloadResult(key){
    this.apiService.downloadResultFile(key).subscribe(data => {
        console.log("gogogo");
        let blob = new File([data], "result.docx");
        let url = window.URL.createObjectURL(blob);
        window.location.href = url;
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

    showSample(filetype:string){
      this.apiService.downloadSampleFileContent(filetype).subscribe(data=>{
        let blob = new File([data], "sample."+filetype);
        let url = window.URL.createObjectURL(blob);
        window.location.href = url;
      })
    }
  

  dropSampleFileContent(fileContent:string,filetype:string){
    // console.log(atob(fileContent));
    let file_object = new File([fileContent], 'sample.'+filetype, { type: filetype, lastModified:Date.now()});
    this.dropFile(file_object);
  }

  getSample(filetype:string){
    this.apiService.downloadSampleFileContent(filetype).subscribe(data =>this.dropSampleFileContent(data,filetype),error=> alert("Download sample file error!"));
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