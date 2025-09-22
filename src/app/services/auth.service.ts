import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthState, User, LoginRequest, LoginResponse, UserRole, RegisterRequest, RegisterResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = '/api/auth'; // Cambiar por tu URL de API
  private readonly TOKEN_KEY = 'token'; // Mantener consistencia con el componente
  private readonly USER_KEY = 'currentUser'; // Mantener consistencia con el componente
  
  // Estado de autenticación
  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null
  });

  // Observable público del estado
  public authState$ = this.authState.asObservable();
  
  // Observables específicos para mayor comodidad
  public isAuthenticated$ = this.authState$.pipe(map(state => state.isAuthenticated));
  public currentUser$ = this.authState$.pipe(map(state => state.user));
  public isLoading$ = this.authState$.pipe(map(state => state.loading));
  public authError$ = this.authState$.pipe(map(state => state.error));

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  /**
   * Inicializar el estado de autenticación desde localStorage
   */
  private initializeAuthState(): void {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userJson = localStorage.getItem(this.USER_KEY);
      
      if (token && userJson) {
        const user: User = JSON.parse(userJson);
        
        // Verificar si el token no ha expirado
        if (this.isTokenValid(token)) {
          this.updateAuthState({
            isAuthenticated: true,
            user,
            token,
            loading: false,
            error: null
          });
        } else {
          this.clearStoredAuth();
        }
      }
    } catch (error) {
      console.error('Error inicializando estado de autenticación:', error);
      this.clearStoredAuth();
    }
  }

  /**
   * Verificar si el token es válido (no implementado completamente por ser demo)
   */
  private isTokenValid(token: string): boolean {
    // En una aplicación real, aquí verificarías la expiración del JWT
    // Por ahora, simplemente verificamos que exista
    return !!token && token.startsWith('iclass-token-');
  }

  /**
   * Iniciar sesión
   */
  login(credentials: LoginRequest): Observable<User> {
    this.setLoading(true);
    this.clearError();

    // En una aplicación real, harías la petición HTTP al backend
    return this.simulateLogin(credentials).pipe(
      tap(response => {
        if (response.success) {
          this.handleLoginSuccess(response);
        } else {
          this.setError(response.message || 'Error al iniciar sesión');
        }
      }),
      map(response => response.user),
      catchError(error => {
        this.setError('Error de conexión. Intenta nuevamente.');
        return throwError(() => error);
      }),
      tap(() => this.setLoading(false))
    );
  }

  /**
   * Simular login para demo (reemplazar con llamada HTTP real)
   */
  private simulateLogin(credentials: LoginRequest): Observable<LoginResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        const mockUsers: User[] = [
          {
            id: 1,
            email: 'director@colegio.edu.co',
            firstName: 'María',
            lastName: 'González',
            role: UserRole.DIRECTOR,
            isActive: true,
            createdAt: new Date(),
            lastLogin: new Date()
          },
          {
            id: 2,
            email: 'docente@colegio.edu.co',
            firstName: 'Carlos',
            lastName: 'Rodríguez',
            role: UserRole.DOCENTE,
            isActive: true,
            createdAt: new Date(),
            lastLogin: new Date()
          },
          {
            id: 3,
            email: 'estudiante@colegio.edu.co',
            firstName: 'Ana',
            lastName: 'Martínez',
            role: UserRole.ESTUDIANTE,
            isActive: true,
            createdAt: new Date(),
            lastLogin: new Date()
          },
          {
            id: 4,
            email: 'padre@colegio.edu.co',
            firstName: 'Luis',
            lastName: 'Pérez',
            role: UserRole.PADRE,
            isActive: true,
            createdAt: new Date(),
            lastLogin: new Date()
          }
        ];

        const user = mockUsers.find(u => 
          u.email.toLowerCase() === credentials.email.toLowerCase()
        );

        if (user && credentials.password === '123456') {
          const response: LoginResponse = {
            success: true,
            token: `iclass-token-${user.id}-${Date.now()}`,
            user: { ...user, lastLogin: new Date() },
            message: 'Inicio de sesión exitoso',
            expiresIn: 3600 // 1 hora
          };
          observer.next(response);
        } else {
          const errorResponse: LoginResponse = {
            success: false,
            token: '',
            user: {} as User,
            message: 'Credenciales incorrectas'
          };
          observer.next(errorResponse);
        }
        observer.complete();
      }, 1000); // Simular delay de red
    });
  }

  /**
   * Manejar inicio de sesión exitoso
   */
  private handleLoginSuccess(response: LoginResponse): void {
    // Guardar en localStorage
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    
    // Actualizar estado
    this.updateAuthState({
      isAuthenticated: true,
      user: response.user,
      token: response.token,
      loading: false,
      error: null
    });
  }

  /**
   * Registrar nuevo usuario
   */
  register(userData: RegisterRequest): Observable<User> {
    this.setLoading(true);
    this.clearError();

    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, userData).pipe(
      tap(response => {
        if (response.success) {
          // El usuario deberá hacer login después del registro
          this.setLoading(false);
        }
      }),
      map(response => response.user),
      catchError(error => {
        this.setError('Error al registrar usuario');
        return throwError(() => error);
      })
    );
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    this.clearStoredAuth();
    this.updateAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null
    });
    this.router.navigate(['/auth/login']);
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.authState.value.isAuthenticated;
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser(): User | null {
    return this.authState.value.user;
  }

  /**
   * Obtener token actual
   */
  getToken(): string | null {
    return this.authState.value.token;
  }

  /**
   * Verificar si el usuario tiene un rol específico
   */
  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  /**
   * Verificar si el usuario tiene alguno de los roles especificados
   */
  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  /**
   * Actualizar perfil de usuario
   */
  updateProfile(userData: Partial<User>): Observable<User> {
    this.setLoading(true);
    
    return this.http.put<User>(`${this.API_URL}/profile`, userData).pipe(
      tap(updatedUser => {
        const currentState = this.authState.value;
        this.updateAuthState({
          ...currentState,
          user: updatedUser,
          loading: false
        });
        
        // Actualizar localStorage
        localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
      }),
      catchError(error => {
        this.setError('Error al actualizar perfil');
        return throwError(() => error);
      })
    );
  }

  /**
   * Cambiar contraseña
   */
  changePassword(currentPassword: string, newPassword: string): Observable<boolean> {
    this.setLoading(true);
    
    const passwordData = {
      currentPassword,
      newPassword
    };

    return this.http.put<{ success: boolean }>(`${this.API_URL}/change-password`, passwordData).pipe(
      map(response => response.success),
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.setError('Error al cambiar contraseña');
        return throwError(() => error);
      })
    );
  }

  /**
   * Recuperar contraseña
   */
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.API_URL}/forgot-password`, { email }).pipe(
      map(response => response.success),
      catchError(error => {
        console.error('Error en recuperación de contraseña:', error);
        return of(false);
      })
    );
  }

  /**
   * Verificar email
   */
  verifyEmail(token: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.API_URL}/verify-email`, { token }).pipe(
      map(response => response.success),
      catchError(error => {
        console.error('Error en verificación de email:', error);
        return of(false);
      })
    );
  }

  /**
   * Obtener headers de autorización
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Métodos auxiliares privados
  private updateAuthState(newState: Partial<AuthState>): void {
    const currentState = this.authState.value;
    this.authState.next({ ...currentState, ...newState });
  }

  private setLoading(loading: boolean): void {
    this.updateAuthState({ loading });
  }

  private setError(error: string): void {
    this.updateAuthState({ error, loading: false });
  }

  private clearError(): void {
    this.updateAuthState({ error: null });
  }

  private clearStoredAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('savedEmail');
  }

  // Verifica si hay sesión activa
isLogged(): boolean {
  return this.isAuthenticated();
}

// Verifica roles específicos
isAdmin(): boolean {
  return this.hasRole(UserRole.DIRECTOR); // 👈 si tu rol ADMIN es "DIRECTOR"
}

isDocente(): boolean {
  return this.hasRole(UserRole.DOCENTE);
}

isEstudiante(): boolean {
  return this.hasRole(UserRole.ESTUDIANTE);
}

isPadre(): boolean {
  return this.hasRole(UserRole.PADRE);
}

}