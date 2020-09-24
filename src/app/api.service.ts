import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = environment.baseUrl;
  file_data: any;
  constructor(private http: HttpClient) {}

  public downloadResultFile(key:string): any {
		return this.http.get(this.apiURL+"result/"+key, {responseType: 'blob'});
  }

  public downloadExampleFile(filetype:string): any {
		return this.http.get(this.apiURL+"examplefile/"+filetype, {responseType: 'blob'});
  }

  public sendFiles(fd) {
    return this.http.post<any>(this.apiURL+"data2doc", fd);
  }

}