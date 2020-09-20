import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = environment.baseUrl;
  file_data: any;
  constructor(private http: HttpClient) {}

  public downloadSampleFileContent(filetype:string): any {
		return this.http.get(this.apiURL+"samplefilecontent/"+filetype, {responseType: 'text'});
  }

  public sendFiles(fd) {
    return this.http.post(this.apiURL+"merge_files", fd);
  }


}