import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpendingService } from 'src/services/spending.service';
import { Spending } from 'src/model/Spending';
import { formatDate } from '@angular/common';
import { UserService } from 'src/services/user.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-view-spendings',
  templateUrl: './view-spendings.component.html',
  styleUrls: ['./view-spendings.component.css']
})
export class ViewSpendingsComponent implements OnInit, AfterViewInit, OnDestroy {
  spendings: Spending[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();
  userId: number | undefined;
  spendingByMonth: { month: string, amount: number }[] = [];
  spendingChart: Chart | undefined;

  constructor(
    private spendingService: SpendingService,
    private router: Router,
    private userService: UserService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadAllSpendings();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.spendingChart) {
      this.spendingChart.destroy();
    }
  }

loadAllSpendings() {
  this.spendingService.getAllSpendings().subscribe(spendings => {
    this.spendings = spendings;
  });
}

  
  
  getMonthName(monthIndex: number): string {
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return months[monthIndex];
  }
   

  getSpendingsByDate() {
    const formattedStartDate = formatDate(this.startDate, 'yyyy-MM-dd', 'tr-TR');
    const formattedEndDate = formatDate(this.endDate, 'yyyy-MM-dd', 'tr-TR');

    this.spendingService.getSpendingsByDate(formattedStartDate, formattedEndDate).subscribe(spendings => {
      this.spendings = spendings;
    });
  }

  addSpending(spending: Spending) {
    this.spendingService.createSpending(spending).subscribe(() => {
      this.loadAllSpendings();
    });
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

  clearFilter() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.userId = undefined;
    this.loadAllSpendings();
  }

}