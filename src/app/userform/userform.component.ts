import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import User from '../entity/User';
import { UserService } from '../user.service';
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {
  user:User= new User('Mahesh', 25, 'mahesh@gmail.com');
  users:any=[];

  constructor(public userService: UserService) { }
  ngOnInit(): void {
    this.getUsers();
  }
  private getUsers(){
    const observable=this.userService.getUser();
    observable.subscribe(users=>{
      this.users=users;
    })
  }

  deleteUser(userId:number){
  const observable=this.userService.deleteUser(userId);
  observable.subscribe(response=>{
    this.getUsers();
  })
  }

  save(){
    console.log("Clicked");
    //Ajax call
    const observable= this.userService.saveUser(this.user);
    observable.subscribe((response)=>{//Success hadler
      console.log(response);
      this.getUsers();
      },
      (error)=>{//Error Handler
        alert('Something went wrong.!');
      }
      )
  }
}
