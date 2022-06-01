import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProcessService } from './process.service';
import { StorageService } from './storage.service';


const baseUrl = environment.baseUrl ; 
//const corsUrl = environment.corsUrl ;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private storageService : StorageService,
    private router : Router
  ) { }



    public authenticate(username : String, password : String) : Observable<any>
  {
    const key = btoa(unescape(encodeURIComponent(`${username}:${password}`)));
    const httpOptions = { headers : new HttpHeaders({'Content-Type': 'application/json',
        Authorization: `Basic ${key}`,
        'Access-Control-Allow-Origin': '*',
        })};
        
    return this.http.get<any>(`${baseUrl}/task`,httpOptions)
  }

  logout() {
    //this.storageService.removeCurrentUser('currentUser','password').then(res => {
    this.storageService.clear().then(res => {
      this.router.navigate(['/login']);
    });
  }
}
