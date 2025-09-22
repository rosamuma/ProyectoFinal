import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-monthly-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
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
        labels: d.monthly.months,         //son los nombres de cada columna en el eje X del gráfico. Ejemplo: ['Enero', 'Febrero', 'Marzo', 'Abril']
        datasets: [                       //es un arreglo con los valores que se van a graficar. Ejemplo: [65, 59, 80, 81]
          { data: d.monthly.values, label: 'Rendimiento Mensual' }
        ]
      };
    });
  }
}
