import { Component, OnInit } from '@angular/core';      //Oninit  deja ejecutar lógica apenas se monta el componente.
import { DashboardService } from '@services/dashboard.service';     //se importa el servicio que se creo para pedir los datos.
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-subjects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-subjects.html',
  styleUrls: ['./progress-subjects.css']
})
export class ProgressSubjects implements OnInit {
  data: any;          
  constructor(private ds: DashboardService) {}          
  ngOnInit(){         
     this.ds.getDashboard().subscribe(d => this.data = d.progress); }
}
