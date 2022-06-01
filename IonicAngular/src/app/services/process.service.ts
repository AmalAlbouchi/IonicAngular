import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';


const baseUrl = environment.baseUrl ; 

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(
    private http : HttpClient,
    private storageService : StorageService,
    private router : Router
  ) { }


  public header(username : string, password : string) : any
  {
    const key = btoa(unescape(encodeURIComponent(`${username}:${password}`)));
    const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json',
        Authorization: `Basic ${key}`,
        'Access-Control-Allow-Origin': '*',
        })};
    return httpOptions;
}

  public getProcesses(username : string, password : string) : Observable<any>
  {
    return this.http.get<any>(`${baseUrl}/process-definition?startablePermissionCheck=true&latestVersion=true`,this.header(username,password))
  }

  public getProcessesCount(username : string, password : string) : Observable<any>
  {
    return this.http.get<any>(`${baseUrl}/process-definition/count?startablePermissionCheck=true&latestVersion=true`,this.header(username,password))
  }

  public getProcessesIns(username : string, password : string) : Observable<any>
  {
    return this.http.get<any>(`${baseUrl}/process-instance`,this.header(username,password))
  }

  public getProcess(username : string, password : string, id : string) : Observable<any>
  {
    return this.http.get<any>(`${baseUrl}/process-definition/${id}`,this.header(username,password))
  }

  public getProcessVariables(username : string, password : string, id : string) : Observable<any>
  {
    return this.http.get<any>(`${baseUrl}/process-definition/${id}/form-variables`,this.header(username,password))
  }
 
  public submitForm(username : string, password : string, id : string, data : any) : Observable<any>
  {
    return this.http.post<any>(`${baseUrl}/process-definition/${id}/submit-form` , data , this.header(username,password))
  }

}
