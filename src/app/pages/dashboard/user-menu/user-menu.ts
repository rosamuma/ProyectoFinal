import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-menu.html',
  styleUrls: ['./user-menu.css']
})
export class UserMenu implements OnInit {
  open = false;
  user: any = { firstName: '', lastName: '', email: '' };

  constructor(private auth: AuthService, private router: Router, private elRef: ElementRef) {}

  ngOnInit() {
    this.user = this.auth.user || this.auth.getUser?.() || this.user;
  }

  toggle() {
    this.open = !this.open;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) this.open = false;
  }

  onLogout() {
    const ok = window.confirm('¿Estás seguro que quieres cerrar la sesión?');
    if (!ok) return;

    if (typeof this.auth.logout === 'function') {
      this.auth.logout();
    } else {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        localStorage.removeItem('iclass-token');
        sessionStorage.removeItem('token');
      } catch (err) {}
    }

    this.router.navigate(['/login']);
  }
}