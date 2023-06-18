import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Spending } from 'src/model/Spending';
import { SpendingService } from 'src/services/spending.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-monthly-spending',
  templateUrl: './monthly-spending.component.html',
  styleUrls: ['./monthly-spending.component.css']
})
export class MonthlySpendingComponent implements OnInit {
  spendings: Spending[] = [];

  constructor(private spendingService: SpendingService) { }

  ngOnInit(): void {
    this.getAllSpendings();
  }

  getAllSpendings(): void {
    this.spendingService.getAllSpendings().subscribe(
      (spendings: Spending[]) => {
        this.spendings = spendings;
        this.generateMonthlyChart();
      },
      (error: any) => {
        console.error('Error retrieving spendings:', error);
      }
    );
    
    }
    generateMonthlyChart(): void {
      const monthlyData = this.groupSpendingsByMonth();
    
      const labels = Object.keys(monthlyData);
      const data = Object.values(monthlyData);
    
      // Sütun grafik oluşturun
      const chart = new Chart('monthlyChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Aylık Harcamalar',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)', 
            borderColor: 'rgba(54, 162, 235, 1)', 
            borderWidth: 1 
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    groupSpendingsByMonth(): { [key: string]: number } {
      const monthlyData: { [key: string]: number } = {};
    
      for (const spending of this.spendings) {
        if (spending.date) {
          const month = new Date(spending.date).getMonth() + 1;
          const formattedMonth = this.formatMonth(month);
          if (monthlyData[formattedMonth]) {
            monthlyData[formattedMonth] += spending.price;
          } else {
            monthlyData[formattedMonth] = spending.price;
          }
        }
      }
    
      return monthlyData;
    }
    
    formatMonth(month: number): string {
      const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
      return monthNames[month - 1];
    }
  }