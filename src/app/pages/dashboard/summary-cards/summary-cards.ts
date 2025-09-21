import { Component, OnInit } from '@angular/core';      //Oninit  deja ejecutar lógica apenas se monta el componente.
import { DashboardService } from '@services/dashborad.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-cards.html',
  styleUrls: ['./summary-cards.css']
})
export class SummaryCards implements OnInit{
  data: any;          //propiedad que guardará los datos (en este caso el objeto summary).
  constructor(private ds: DashboardService) {}          //propiedad que guardará los datos (en este caso el objeto summary).
  ngOnInit(){         //inyecta el servicio en el componente.
     this.ds.getDashboard().subscribe(d => this.data = d.summary); }
}
