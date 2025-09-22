import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-monthly-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './monthly-chart.html',
  styleUrls: ['./monthly-chart.css']
})
export class MonthlyChart  implements OnInit {
barChartData!: ChartConfiguration<'bar'>['data'];
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  constructor(private ds: DashboardService) {}
  ngOnInit() {
    this.ds.getDashboard().subscribe(d => {
      this.barChartData = {
        labels: d.monthly.months,
        datasets: [
          { data: d.monthly.values, label: 'Rendimiento Mensual' }
        ]
      };
    });
  }
}
