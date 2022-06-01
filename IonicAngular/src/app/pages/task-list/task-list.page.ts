import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessService } from 'src/app/services/process.service';
import { StorageService } from 'src/app/services/storage.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  constructor(
    private taskService : TaskService,
    private storageService : StorageService,
    private route : ActivatedRoute,
    private router : Router
  ) { }


  list = [];
  count : any;
  status : any;

  async ngOnInit() {
      
    let username: string = await this.storageService.get('currentUser');
    let password: string = await this.storageService.get('password');
    this.status = this.route.snapshot.paramMap.get('status');
    
    //ALL
/*  this.taskService.getTasks(username,password).subscribe( (res) => {
    console.log('tasks',res)
    this.list = res;
  },
  err => {
    console.log(err.status);
  }
)  
  this.taskService.getTasksCount(username,password).subscribe( (res) => {
    console.log('tasks count',res)
  },
  err => {
    console.log(err.status);
  }
)*/
   
if (this.status == "assigned"){
//assigned
    this.taskService.getTasksAssigned(username,password).subscribe( (res) => {
      console.log('assignedtasks',res)
      this.list = res;
    },
    err => {
      console.log(err.status);
    }
    )
    this.taskService.getTasksAssignedCount(username,password).subscribe( (res) => {
    console.log('assignedtasks count',res)
    this.count = res['count']
    },
    err => {
    console.log(err.status);
    }
    )
} 
else{
//unassigned
    this.taskService.getTasksUnassigned(username,password).subscribe( (res) => {
      console.log('unassignedtasks',res)
      this.list = res;
    },
    err => {
      console.log(err.status);
    }
    )
    this.taskService.getTasksUnassignedCount(username,password).subscribe( (res) => {
    console.log('unassignedtasks count',res)
    this.count = res['count']
    },
    err => {
    console.log(err.status);
    }
    )
}
}


  details(id : string){
    console.log(id)
    this.router.navigate([`task/${this.status}/${id}`]);
  }

}
