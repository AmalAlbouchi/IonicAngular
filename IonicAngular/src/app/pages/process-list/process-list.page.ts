import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessService } from 'src/app/services/process.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.page.html',
  styleUrls: ['./process-list.page.scss'],
})
export class ProcessListPage implements OnInit {

  constructor(
    private processService : ProcessService,
    private storageService : StorageService,
    private router : Router
  ) { }

  list = [];
  count : any;

  async ngOnInit() {
      
    let username: string = await this.storageService.get('currentUser');
    let password: string = await this.storageService.get('password');
    
    this.processService.getProcesses(username,password).subscribe( (res) => {
      console.log('def',res)
      this.list = res;
    },
    err => {
      console.log(err.status);
      console.log("non");
    }
  )

    this.processService.getProcessesCount(username,password).subscribe( (res) => {
      console.log('count',res)
      this.count = res['count']
    },
    err => {
      console.log(err.status);
      console.log("non");
    }
  )


  }

  details(id : string){
    console.log(id)
    this.router.navigate([`process/${id}`]);
  }

}
