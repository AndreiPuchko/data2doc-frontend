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
  
  canDrop(fileName:string):boolean {
    var fileType;
    fileType = fileName.slice(-3).toLowerCase();
    for (let i = 0; i < this.filesDz.length; i++){
      if (fileType===this.filesDz[i].name.slice(-3).toLowerCase())
        return false;
    }
    return true;
  }
 
  ngOnInit(){
    this.downloadSampleFiles();
  }

  data2doc(){
    // this.filesDz[0].text().then(val=>alert(val));

    let fd: FormData = new FormData();
    for (let i = 0; i < this.filesDz.length; i++){
      fd.append('file', this.filesDz[i], this.filesDz[i].name);
    }
    // this.http.post(this.baseUrl+"data2doctest",fd).subscribe(data => {alert(123333)}, error => console.log("res") );
    
    // this.apiService.sendFiles(fd).subscribe(data => {alert(123)}, error => console.log("res") );

    this.apiService.sendFiles(fd).subscribe(
      data => {
        console.log('Sent successfully.');
      },
      error => {
        console.log('The given data was invalid.');
      },
      () => {
        //
      }
    );    
    }

    dropSampleFileContent(fileContent:string,filetype:string){
      // let decodedFileContent=atob(fileContent);
      let file_object = new File([atob(fileContent)], 'sample.'+filetype, { type: filetype, lastModified:Date.now()});
      if (this.canDrop(file_object.name)===true){
        this.filesDz.push(file_object);
      }
    }
  getSample(filetype:string){
    this.apiService.downloadSampleFileContent(filetype).subscribe(data =>this.dropSampleFileContent(data,filetype),error=> alert("Download samle file error!"));
  }

  downloadSampleFiles(){
    this.getSample("txt");
    this.getSample("xlsx");
    this.getSample("docx");
  }

  onSelectDz(event) {
    for (let i = 0; i < event.addedFiles.length; i++) {
      if (this.canDrop(event.addedFiles[i].name)===true){
        this.filesDz.push(event.addedFiles[i]);
      }
    }
  }
  
  onRemoveDz(event) {
    this.filesDz.splice(this.filesDz.indexOf(event), 1);
  }
}