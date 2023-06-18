import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SpendingService } from './spending.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private userService: UserService,
    private spendingService: SpendingService
  ) {}

  getLoginUser(): string {
    const loginUser = localStorage.getItem('loginUser');
    return loginUser ? loginUser : '';
  }

  getUserCount(): Promise<number> {
    return this.userService.getAllUsers().toPromise().then(users => users ? users.length : 0);
  }

  getSpendingCount(): Promise<number> {
    return this.spendingService.getAllSpendings().toPromise().then(spendings => spendings ? spendings.length : 0);
  }

  getTotalSpendings(): Promise<number> {
    return this.spendingService.getAllSpendings().toPromise().then(spendings => {
      if (spendings) {
        const total = spendings.reduce((acc, curr) => acc + curr.price, 0);
        return total;
      } else {
        return 0;
      }
    });
  }
}
