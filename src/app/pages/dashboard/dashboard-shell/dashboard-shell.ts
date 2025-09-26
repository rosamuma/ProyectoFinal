//inyecta el servicio.
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryCards} from '../summary-cards/summary-cards';
import { ProgressSubjects } from '../progress-subjects/progress-subjects';
import { RecentActivity } from '../recent-activity/recent-activity';
import { MonthlyChart } from '../monthly-chart/monthly-chart';
import { TopStudents } from '../top-students/top-students';
import { AuthService } from '@services/auth.service';
import { WelcomeHeader } from '../welcome-header/welcome-header'

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [CommonModule, SummaryCards, ProgressSubjects, RecentActivity, MonthlyChart, TopStudents, WelcomeHeader],
  templateUrl: './dashboard-shell.html',
  styleUrls: ['./dashboard-shell.css']
})
export class DashboardShell {
 constructor(public auth: AuthService) {}

 ngOnInit(): void {
    console.log('¿Está logueado?', this.auth.isLogged());
  console.log('¿Es director?', this.auth.isAdmin());
  console.log('¿Es docente?', this.auth.isDocente());
  console.log('¿Es estudiante?', this.auth.isEstudiante());
  }
}
