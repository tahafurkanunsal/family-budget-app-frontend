import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{
  
  users: User[] = [];
  

  constructor(private userService: UserService , private router:Router) {}
  
  
  ngOnInit() {
    this.userService.getAllUsers().subscribe(users =>{
      this.users = users;
    })
  }

  deleteUser(id :number){
    this.userService.deleteUser(id).subscribe(data => {
      this.users = this.users?.filter(user => user.id !== id);
    })

    setTimeout(() => {
      window.location.reload();
    },100);
  }

  updateUser(id: number) {
  this.router.navigate(['/update', id]);
}
  
}
