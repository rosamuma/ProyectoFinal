import { Component, OnInit } from '@angular/core';      //Oninit  deja ejecutar lógica apenas se monta el componente.
import { CommonModule } from '@angular/common';         //sirve para proporcionar un conjunto de directivas y tuberías de uso común en las plantillas, como *ngIf y *ngFor

@Component({
  selector: 'app-welcome-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-header.html',
  styleUrls: ['./welcome-header.css']
})
export class WelcomeHeader implements OnInit {
  currentDate: Date = new Date(); // Cambia de string a Date

  ngOnInit() {
    this.currentDate = new Date(); // Solo asignar Date, sin formatear
  }
}
