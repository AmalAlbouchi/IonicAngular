import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessService } from 'src/app/services/process.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-process',
  templateUrl: './process.page.html',
  styleUrls: ['./process.page.scss'],
})
export class ProcessPage implements OnInit {

  constructor(
    private processService : ProcessService,
    private storageService : StorageService,
    private route : ActivatedRoute,
    private router : Router,
    private formBuilder : FormBuilder,
    public alertController: AlertController
    ) { }

    process : any;
    vars : any;
    variables = [];
    public form: FormGroup = this.formBuilder.group({});

  async ngOnInit() {
    
    let username: string = await this.storageService.get('currentUser');
    let password: string = await this.storageService.get('password');
    const process_id = this.route.snapshot.paramMap.get('id');

    this.processService.getProcess(username,password,process_id).subscribe(
      (res) => {
        this.process = res
        console.log(this.process)
      },
      err => {
        console.log(err.status);
        console.log("non");
      }
    )

    this.processService.getProcessVariables(username,password,process_id).subscribe(
      (res) => {
        console.log("vars",res)
        this.vars = res
        this.create()
      },
      err => {
        console.log(err.status);
        console.log("non");
      }
    )
  }


  create(){
      Object.entries(this.vars).forEach(element => {
        this.form.addControl(element[0],new FormControl('', Validators.required));
        this.variables.push(
            { 
              'name' : element[0],
              'type' : element[1]['type'],
              'value' : element[1]['value']
            }
        );
    });
  }


  async submit(){

    let username: string = await this.storageService.get('currentUser');
    let password: string = await this.storageService.get('password');
    const process_id = this.route.snapshot.paramMap.get('id');

    let json = {
      "variables" : {}
    }
    
    Object.entries(this.form.value).forEach( ([key,value])=> {
      let input = {"value" : value}
      json.variables[key] = input
    });

    console.log(json)

    this.processService.submitForm(username,password,process_id,json).subscribe(
      (res) => {
        this.showAlertY()
      },
      err => {
        console.log(err.status);
        this.showAlertN()
      }
    )

  }





  async showAlertY() {
    const alert = await this.alertController.create({
      header: 'Request Submitted Successfully',
      subHeader: '',
      message: 'Thank you for submitting your request',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showAlertN() {
    const alert = await this.alertController.create({
      header: 'ERROR',
      subHeader: '',
      message: 'The request was not submitted',
      buttons: ['OK']
    });

    await alert.present();
  }
}
