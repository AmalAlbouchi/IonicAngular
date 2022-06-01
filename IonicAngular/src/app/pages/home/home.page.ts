import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router,
    private storageService : StorageService

  ) { }

  username : string;

  async ngOnInit() {
    this.username = await this.storageService.get('currentUser');
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }

  logout() {
    console.log("aaa")
    this.authService.logout();
    this.router.navigate(['home']);
  }

  process(){
    this.router.navigate(['process']);
  }

  taskAssigned(){
    this.router.navigate(['task/assigned']);
  }
  
  taskUnassigned(){
    this.router.navigate(['task/unassigned']);
  }
}
