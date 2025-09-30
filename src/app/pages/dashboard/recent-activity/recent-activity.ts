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
      case 'Nuevo': return 'bg-primary';        // ← Azul
      case 'Pronto': return 'bg-warning';       // ← Amarillo/Naranja  
      case 'Completado': return 'bg-success';   // ← Verde
      case 'Importante': return 'bg-info';      // ← Azul claro
      case 'Pendiente': return 'bg-danger';     // ← Rojo
      default: return 'bg-secondary';
    }
  }
}
