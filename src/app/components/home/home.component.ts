import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/User';
import { DataService } from 'src/services/data.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userCount: number | undefined;
  spendingCount: number | undefined;
  totalSpendings: number | undefined;
  users: Observable<User[]> | undefined;

  constructor(private dataService: DataService, private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.userCount = await this.dataService.getUserCount();
    this.spendingCount = await this.dataService.getSpendingCount();
    this.totalSpendings = await this.dataService.getTotalSpendings();
    this.users = this.userService.getAllUsers();
  }
}
