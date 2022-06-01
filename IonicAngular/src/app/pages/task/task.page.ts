import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  constructor(
    private taskService : TaskService,
    private storageService : StorageService,
    private route : ActivatedRoute,
    private router : Router,
    private formBuilder : FormBuilder,
    public alertController: AlertController
  ) { }


  task : any;
  vars : any;
  variables = [];
  public form: FormGroup = this.formBuilder.group({});
  username : any;
  password : any;
  task_id : any;
  status : any;


  async ngOnInit() {

    this.username = await this.storageService.get('currentUser');
    this.password = await this.storageService.get('password');
    this.task_id = this.route.snapshot.paramMap.get('id');
    this.status = this.route.snapshot.paramMap.get('status');

    //Get Task
    this.taskService.getTask(this.username,this.password,this.task_id).subscribe(
      (res) => {
        this.task = res
        console.log(this.task)
      },
      err => {
        console.log(err.status);
        console.log("non");
      }
    )

    //Get Task Variables
    this.taskService.getTaskVariables(this.username,this.password,this.task_id).subscribe(
      (res) => {
        this.vars = res
        this.create()
      },
      err => {
        console.log(err.status);
        console.log("non");
      }
    )

  }

//Create Form by getting Form Variables
  create(){
    Object.entries(this.vars).forEach(element => {
      this.form.addControl(element[0],new FormControl('', Validators.required));
      if (element[1]['value']){
        this.form.controls[element[0]].disable();
      }
      console.log(element[0],element[1]['type'], element[1]['value'])

      this.variables.push(
          { 
            'name' : element[0],
            'type' : element[1]['type'],
            'value' : element[1]['value']
          }
      );
  });
}


//Complete Task
async submit(){

  let json = {
    "variables" : {
      "valid": {
      "type": "Boolean",
      "value": "False",
      "valueInfo": {}
  }
  }
  }
  
  /*Object.entries(this.form.value).forEach( ([key,value])=> {
    console.log(value)
    if(value != ''){
      console.log("a")
    let input = {"value" : value}
    json.variables[key] = input}
  });*/

  console.log(json)

  this.taskService.submitForm(this.username,this.password,this.task_id,json).subscribe(
    (res) => {
      this.showAlertSubmitY()
      this.router.navigate([`home`]);
    },
    err => {
      console.log(err.status);
      this.showAlertSubmitN()
    }
  )

}


//Claim Task method
  async claim(){

    let json = {
      "userId" : this.username
    }

  this.taskService.claimTask(this.username,this.password,this.task_id,json).subscribe(
    (res) => {
      this.showAlertY()
      this.router.navigate([`home`]);
    },
    err => {
      console.log(err.status);
      this.showAlertN()
    }
  )
}

//Unclaim Task method
async unclaim(){

  let json = {
    "userId" : this.username
  }

this.taskService.unclaimTask(this.username,this.password,this.task_id,json).subscribe(
  (res) => {
    this.showAlertUnclaimY()
    this.router.navigate([`home`]);
  },
  err => {
    console.log(err.status);
    this.showAlertUnclaimN()
  }
)
}


//Alerts For Claim
//YES
async showAlertY() {
  const alert = await this.alertController.create({
    header: 'Task Claimed Successfully',
    subHeader: '',
    message: 'Thank you for Claiming this Task',
    buttons: ['OK']
  });

  await alert.present();
}

//NO
async showAlertN() {
  const alert = await this.alertController.create({
    header: 'ERROR',
    subHeader: '',
    message: 'The Task was not Claimed',
    buttons: ['OK']
  });

  await alert.present();
}

//Alerts For unClaim
//YES
async showAlertUnclaimY() {
  const alert = await this.alertController.create({
    header: 'Task Unclaimed Successfully',
    subHeader: '',
    message: 'Task will now be available in Unassigned Task List',
    buttons: ['OK']
  });

  await alert.present();
}

//NO
async showAlertUnclaimN() {
  const alert = await this.alertController.create({
    header: 'ERROR',
    subHeader: '',
    message: 'The Task was not Unclaimed',
    buttons: ['OK']
  });

  await alert.present();
}


//Alerts For Submit
//YES
async showAlertSubmitY() {
  const alert = await this.alertController.create({
    header: 'Task Completed Successfully',
    subHeader: '',
    message: 'Thank you for completing the task',
    buttons: ['OK']
  });

  await alert.present();
}

//NO
async showAlertSubmitN() {
  const alert = await this.alertController.create({
    header: 'ERROR',
    subHeader: '',
    message: 'The Task was not completed',
    buttons: ['OK']
  });

  await alert.present();
}

}
