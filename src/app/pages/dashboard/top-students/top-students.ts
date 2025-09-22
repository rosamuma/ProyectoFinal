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
}
