import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  filteredUser: User | null = null; // Variable to store the filtered user
  originalUsers: User[] = []; // Variable to store the original list of users

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.users = this.users.filter(user => user.id !== id);
    });

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  updateUser(id: number) {
    this.router.navigate(['/update', id]);
  }

  findUserWithHighestTotalSpend() {
    this.userService.findUserWithHighestTotalSpend().subscribe(user => {
      if (user) {
        this.filteredUser = user;
      }
    });
  }

  clearFilter() {
    this.filteredUser = null;
    this.users = this.originalUsers;
  }
}
