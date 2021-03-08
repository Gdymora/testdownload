import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataUser } from 'src/app/interface/data-user';
import { DataFile } from 'src/app/interface/data-file';
@Injectable({
  providedIn: 'root'
})

export class ApiUserService {

  API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  postFile(formData: FormData): Observable<Object> {
    return this.httpClient.post(`${this.API}/upload`, formData);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.API}/files`);
  }

  getUserAll(): Observable<any> {
    return this.httpClient.get(`${this.API}`);
  }

  postUser(user: DataUser): Observable<any> {
    return this.httpClient.post<DataUser>(`${this.API}/user`, user);
  }

  postgetFile(data_file: DataFile): any {
    return this.httpClient.post(`${this.API}/file`, data_file, { responseType: 'blob' });
  }

  putUser(user: DataUser): Observable<any> {
    return this.httpClient.put<DataUser>(`${this.API}/user`, user);
  }


}

