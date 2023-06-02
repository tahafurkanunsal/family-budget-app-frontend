import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpendingService } from 'src/services/spending.service';
import { Spending } from 'src/model/Spending';
import { formatDate } from '@angular/common';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-view-spendings',
  templateUrl: './view-spendings.component.html',
  styleUrls: ['./view-spendings.component.css']
})
export class ViewSpendingsComponent implements OnInit {

  spendings: Spending[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();
  userId: number | undefined;
  
  constructor(private spendingService: SpendingService, private router: Router , private userService: UserService) {}

  ngOnInit() {
    this.loadAllSpendings();
  }

  loadAllSpendings() {
    this.spendingService.getAllSpendings().subscribe(spendings => {
      this.spendings = spendings;
    });
  }

  getSpendingsByDate() {
    const formattedStartDate = formatDate(this.startDate, 'yyyy-MMM-dd', 'en-US');
    const formattedEndDate = formatDate(this.endDate, 'yyyy-MMM-dd', 'en-US');
  
    this.spendingService.getSpendingsByDate(formattedStartDate, formattedEndDate).subscribe(spendings => {
      this.spendings = spendings;
    });
  }
  

  addSpending(spending: Spending) {
    this.router.navigate(['/add'], { state: { spending } });
  }
  showDetails(spending: Spending) {
    spending.showDetails = !spending.showDetails;
  }

  deleteSpending(id: number) {
    this.spendingService.deleteSpending(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  getSpendingsByUser() {
    if (this.userId) {
      this.userService.getUserSpendings(this.userId).subscribe(spendings => {
        this.spendings = spendings;
      });
    }
  }
}
