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
export class TaskService {

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


    public getTasks(username : string, password : string) : Observable<any>
    {
      return this.http.get<any>(`${baseUrl}/task`,this.header(username,password))
    }
    
    public getTasksCount(username : string, password : string) : Observable<any>
    {
      return this.http.get<any>(`${baseUrl}/task/count`,this.header(username,password))
    }

    public getTasksUnassigned(username : string, password : string) : Observable<any>
    {
      return this.http.get<any>(`${baseUrl}/task?unassigned=true`,this.header(username,password))
    }

    public getTasksUnassignedCount(username : string, password : string) : Observable<any>
    {
      return this.http.get<any>(`${baseUrl}/task/count?unassigned=true`,this.header(username,password))
    }

    public getTasksAssigned(username : string, password : string) : Observable<any>
    {
      return this.http.get<any>(`${baseUrl}/task?assignee=${username}`,this.header(username,password))
    }

    public getTasksAssignedCount(username : string, password : string) : Observable<any>
    {
      return this.http.get<any>(`${baseUrl}/task/count?assignee=${username}`,this.header(username,password))
    }

    public getTask(username : string, password : string, id : string) : Observable<any>
    {
      return this.http.get<any>(`${baseUrl}/task/${id}`,this.header(username,password))
    }

    public getTaskVariables(username : string, password : string, id : string) : Observable<any>
    {
      return this.http.get<any>(`${baseUrl}/task/${id}/form-variables`,this.header(username,password))
    }

    public claimTask(username : string, password : string, id : string, data : any) : Observable<any>
    {
      return this.http.post<any>(`${baseUrl}/task/${id}/claim`,data,this.header(username,password))
    }
  
    public unclaimTask(username : string, password : string, id : string, data : any) : Observable<any>
    {
      return this.http.post<any>(`${baseUrl}/task/${id}/unclaim`,data,this.header(username,password))
    }
}
