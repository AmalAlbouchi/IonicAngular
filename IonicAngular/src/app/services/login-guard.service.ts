import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(
    private router: Router,
    private storageService : StorageService,
    ) { }

  
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let username: string = await this.storageService.get('currentUser');
    if (username) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
