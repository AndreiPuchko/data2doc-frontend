import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = environment.baseUrl;
  file_data: any;
  constructor(private http: HttpClient) {}

  public downloadResultFile(key): any {
		return this.http.get(this.apiURL+"result/"+key, {responseType: 'blob'});
  }


  public downloadSampleFileContent(filetype:string): any {
		return this.http.get(this.apiURL+"samplefile/"+filetype, {responseType: 'blob'});
  }

  public sendFiles(fd) {
    return this.http.post<any>(this.apiURL+"data2doctest", fd);
  }

}