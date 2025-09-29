import { Component, OnInit } from '@angular/core';      //Oninit  deja ejecutar lógica apenas se monta el componente.
import { DashboardService } from '@services/dashboard.service';     //se importa el servicio que se creo para pedir los datos.
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-activity.html',
  styleUrls: ['./recent-activity.css']
})
export class RecentActivity implements OnInit {
  data: any;          
  constructor(private ds: DashboardService) {}          
  ngOnInit(){         
     this.ds.getDashboard().subscribe(d => this.data = d.recent);
    }

    getBadgeClass(badge: string): string {
    switch (badge) {
      case 'Completado': return 'bg-success';
      case 'Pendiente': return 'bg-warning text-dark';
      case 'Error': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
