import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartType, ChartOptions } from 'chart.js';
import { Spending } from 'src/model/Spending';
import { SpendingTypes } from 'src/model/enum/SpendingTypes';
import { SpendingService } from 'src/services/spending.service';

@Component({
  selector: 'app-spending-type',
  templateUrl: './spending-type.component.html',
  styleUrls: ['./spending-type.component.css'],
})
export class SpendingTypeComponent implements OnInit, AfterViewInit {
  spendings: Spending[] = [];
  spendingTypes: SpendingTypes[] = [];
  selectedType: SpendingTypes | null = null;
  pieChartData: { name: string; value: number }[] = [];

  @ViewChild('pieChart', { static: true }) pieChartRef!: ElementRef;
  pieChart: Chart<"pie"> | undefined;

  constructor(private spendingService: SpendingService) { }

  ngOnInit(): void {
    this.getAllSpendings();
  }

  ngAfterViewInit(): void {
    this.createPieChart();
  }

  getAllSpendings(): void {
    this.spendingService.getAllSpendings().subscribe(spendings => {
      this.spendings = spendings;
      this.extractSpendingTypes();
      this.updatePieChartData();
    });
  }

  extractSpendingTypes(): void {
    const types: SpendingTypes[] = [];

    for (const spending of this.spendings) {
      if (!types.includes(spending.type)) {
        types.push(spending.type);
      }
    }

    this.spendingTypes = types;
  }

  updatePieChartData(): void {
    const data: { name: string; value: number }[] = [];
  
    for (const type of this.spendingTypes) {
      const filteredSpendings = this.spendings.filter(spending => spending.type === type);
      const totalPrice = filteredSpendings.reduce((total, spending) => total + spending.price, 0);
      const totalSpending = this.getTotalSpending();
      const percentage = (totalPrice / totalSpending) * 100;
  
      data.push({
        name: type,
        value: percentage
      });
    }
  
    this.pieChartData = data;
    this.updateChart();
  }

  updateChart(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  
    const canvas = this.pieChartRef.nativeElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.pieChartData.map(data => data.name),
        datasets: [
          {
            data: this.pieChartData.map(data => data.value),
            backgroundColor: this.generateRandomColors(this.pieChartData.length)
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed;
                return `${value}%`;
              }
            }
          }
        }
      }
    });
  }

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];

    for (let i = 0; i < count; i++) {
      const color = `rgba(${this.getRandomNumber(0, 255)}, ${this.getRandomNumber(0, 255)}, ${this.getRandomNumber(0, 255)}, 0.7)`;
      colors.push(color);
    }

    return colors;
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onTypeSelect(type: SpendingTypes): void {
    this.selectedType = type;
    if (type) {
      const filteredSpendings = this.spendings.filter(spending => spending.type === type);
      const totalPrice = filteredSpendings.reduce((total, spending) => total + spending.price, 0);
      const percentage = (totalPrice / this.getTotalSpending()) * 100;
      console.log(`Total ${type} spending: ${totalPrice}, Percentage: ${percentage.toFixed(2)}%`);
    }
  }

  getTotalSpending(): number {
    return this.spendings.reduce((total, spending) => total + spending.price, 0);
  }

  createPieChart(): void {
    const canvas = this.pieChartRef.nativeElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }
}
