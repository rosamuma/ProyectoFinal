import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';

// Importar el servicio y modelos
import { AuthService } from '../../../services/auth.service';
import { User, UserRole } from '../../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showDemoInfo = true;
  
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Verificar si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.redirectToDashboard();
      return;
    }

    // Limpiar mensajes de error al iniciar
    this.errorMessage = '';
    
    // Auto-completar email si hay uno guardado
    this.loadSavedCredentials();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(6)
      ]],
      rememberMe: [false]
    });

    // Limpiar errores cuando el usuario escriba
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.errorMessage) {
          this.errorMessage = '';
        }
      });
  }

  private loadSavedCredentials(): void {
    const savedEmail = localStorage.getItem('savedEmail');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (savedEmail && rememberMe) {
      this.loginForm.patchValue({
        email: savedEmail,
        rememberMe: true
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      this.showValidationErrors();
      return;
    }

    this.performLogin();
  }

  private performLogin(): void {
    const { email, password, rememberMe } = this.loginForm.value;
    
    this.isLoading = true;
    this.errorMessage = '';

    // Simular delay de red para mejor UX
    setTimeout(() => {
      this.authenticateUser(email, password, rememberMe);
    }, 1200);
  }

  private authenticateUser(email: string, password: string, rememberMe: boolean): void {
    // Usuarios de demostración
    const mockUsers: User[] = [
      {
        id: 1,
        email: 'director@colegio.edu.co',
        firstName: 'María',
        lastName: 'González',
        role: UserRole.DIRECTOR,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 2,
        email: 'docente@colegio.edu.co',
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        role: UserRole.DOCENTE,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 3,
        email: 'estudiante@colegio.edu.co',
        firstName: 'Ana',
        lastName: 'Martínez',
        role: UserRole.ESTUDIANTE,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 4,
        email: 'padre@colegio.edu.co',
        firstName: 'Luis',
        lastName: 'Pérez',
        role: UserRole.PADRE,
        isActive: true,
        createdAt: new Date()
      }
    ];

    // Buscar usuario
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Validar credenciales
    if (user && password === '123456') {
      this.handleSuccessfulLogin(user, rememberMe);
    } else {
      this.handleLoginError();
    }
  }

  private handleSuccessfulLogin(user: User, rememberMe: boolean): void {
    // Generar token simulado
    const token = `iclass-token-${user.id}-${Date.now()}`;
    
    // Guardar datos de sesión
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('loginTime', new Date().toISOString());
    
    // Manejar "recordar sesión"
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('savedEmail', user.email);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('savedEmail');
    }

    // Actualizar el servicio de autenticación
    
    //this.authService['currentUser$'].next(user);
    
    this.isLoading = false;
    
    // Mostrar mensaje de éxito (opcional)
    this.showSuccessMessage(user);
    
    // Redirigir después de un breve delay
    setTimeout(() => {
      this.redirectToDashboard();
    }, 500);
  }

  private handleLoginError(): void {
    this.isLoading = false;
    this.errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
    
    // Hacer focus en el campo de email para facilitar corrección
    setTimeout(() => {
      const emailInput = document.getElementById('email');
      emailInput?.focus();
    }, 100);
  }

  private showSuccessMessage(user: User): void {
    // Se podría mostrar un toast o mensaje de bienvenida
    console.log(`¡Bienvenido/a, ${user.firstName}!`);
  }

  private redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  private showValidationErrors(): void {
    const firstErrorField = this.getFirstInvalidField();
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      element?.focus();
    }
  }

  private getFirstInvalidField(): string | null {
    const controls = this.loginForm.controls;
    for (const field in controls) {
      if (controls[field].invalid) {
        return field;
      }
    }
    return null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });
  }

  // Métodos para el template
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return fieldName === 'email' 
        ? 'El correo electrónico es requerido'
        : 'La contraseña es requerida';
    }

    if (field.errors['email']) {
      return 'Ingresa un correo electrónico válido';
    }

    if (field.errors['minlength']) {
      return 'La contraseña debe tener mínimo 6 caracteres';
    }

    if (field.errors['pattern']) {
      return 'Formato de correo electrónico inválido';
    }

    return '';
  }

  // Método para ocultar/mostrar info de demo
  toggleDemoInfo(): void {
    this.showDemoInfo = !this.showDemoInfo;
  }

  // Método para limpiar formulario
  clearForm(): void {
    this.loginForm.reset();
    this.errorMessage = '';
    this.showPassword = false;
  }

  // Método para llenar con datos de prueba
  fillTestData(userType: 'director' | 'docente' | 'estudiante' | 'padre'): void {
    const email = `${userType}@colegio.edu.co`;
    this.loginForm.patchValue({
      email: email,
      password: '123456'
    });
  }

  // Método de debug - puedes llamarlo desde el template para pruebas
  debugAuthState(): void {
    console.log('=== Estado de Autenticación ===');
    console.log('isAuthenticated:', this.authService.isAuthenticated());
    console.log('currentUser:', this.authService.getCurrentUser());
    console.log('token:', this.authService.getToken());
    console.log('localStorage token:', localStorage.getItem('token'));
    console.log('localStorage user:', localStorage.getItem('currentUser'));
  }

  // Gestión de eventos del teclado
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.loginForm.invalid) {
      this.onSubmit();
    }
  }

  // Método para validación en tiempo real
  onFieldBlur(fieldName: string): void {
    const field = this.loginForm.get(fieldName);
    if (field) {
      field.markAsTouched();
    }
  }
}