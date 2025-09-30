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
export class MonthlyChart implements OnInit {
  barChartData!: ChartConfiguration<'bar'>['data'];
  
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        max: 100
      }
    },
    elements: {
      bar: {
        borderWidth: 0,           // ← SIN BORDE
        borderRadius: 8,          // ← Bordes redondeados
        borderSkipped: false,
      }
    }
  };

  constructor(private ds: DashboardService) {}
  
  ngOnInit() {
    this.ds.getDashboard().subscribe(d => {
      this.barChartData = {
        labels: d.monthly.months,
        datasets: [
          { 
            data: d.monthly.values, 
            label: 'Rendimiento Mensual',
            // ← SOLO colores sólidos (sin gradiente)
            backgroundColor: [
              '#667eea', '#f5576c', '#4facfe', 
              '#43e97b', '#764ba2', '#f5576c'
            ],
            borderWidth: 0  // ← SIN BORDE
          }
        ]
      };
    });
  }
}