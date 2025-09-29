import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-top-students',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './top-students.html',
  styleUrls: ['./top-students.css']
})
export class TopStudents implements OnInit {
top: any[] = [];

  constructor(private ds: DashboardService) {}

  ngOnInit() {
    this.ds.getDashboard().subscribe(d => {
      this.top = d.topStudents;  
    });
  }

   // 👇 Método para asignar colores de medallas
  getMedalColor(place: number): string {
    switch (place) {
      case 1: return 'gold';     // 1er lugar: oro
      case 2: return 'silver';   // 2do lugar: plata
      case 3: return '#cd7f32';  // 3er lugar: bronce
      default: return '#6c757d'; // Otros: gris (secondary)
    }
  }
}
