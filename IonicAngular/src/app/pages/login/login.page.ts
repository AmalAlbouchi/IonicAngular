import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  name = new FormControl('');
  pass = new FormControl('');
  

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private storageService : StorageService,
    private router : Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {

  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Login Unsuccessful',
      subHeader: 'Wrong Credentials',
      message: 'Please Input Correct Credentials',
      buttons: ['OK']
    });

    await alert.present();
  }


  loginForm = this.formBuilder.group(
    {
      username : ['', [Validators.required]],
      password : ['', [Validators.required]]
    }
    );

  authenticate(username : string, password :string)
    {
      this.authService.authenticate(username,password).subscribe( (res) => {
        console.log(res);
        this.storageService.store('currentUser',username) ;
        this.storageService.store('password',password) ;
        let navigationExtras : NavigationExtras = {
          state: {
            processes: res
          }
        };
    
        this.router.navigate(['home'],navigationExtras);
        this.storageService.get('currentUser').then(
          (res) => {
            console.log("c bon")
            console.log(res)
          }
        )
      },
      err => {
        console.log(err.status);
        this.showAlert()
      }
    )}
}
