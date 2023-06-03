import { formatDate } from '@angular/common';
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
  filteredUser: User | null = null; 
  originalUsers: User[] = []; 
  startDate: Date | null = null;
  endDate: Date | null = null;


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
  findHighestTotalSpendOnGivenDate() {
    if (this.startDate && this.endDate) {
      const formattedStartDate = formatDate(this.startDate, 'yyyy-MMM-dd', 'tr');
      const formattedEndDate = formatDate(this.endDate, 'yyyy-MMM-dd', 'tr');

      this.userService.findHighestTotalSpendOnGivenDate(formattedStartDate, formattedEndDate).subscribe(user => {
        if (user) {
          this.filteredUser = user;
        }
      });
    }
  }

  sortUsersBySpendingSize() {
    this.userService.sortUsersBySpendingSize().subscribe(users => {
      this.users = users;
    });
  }


  clearFilter() {
    this.filteredUser = null;
    this.users = this.originalUsers;
    this.startDate = null;
    this.endDate = null;
  }
}
