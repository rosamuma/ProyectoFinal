export interface User {
  id: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  avatar?: string;
  phone?: string;
  address?: string;
}

export enum UserRole {
  DIRECTOR = 'director',
  DOCENTE = 'docente',
  ESTUDIANTE = 'estudiante',
  PADRE = 'padre'
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
  expiresIn?: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  address?: string;
}

export interface RegisterResponse {
  success: boolean;
  user: User;
  message?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Tipos auxiliares para mejor tipado
export type UserRoleKeys = keyof typeof UserRole;
export type UserWithoutPassword = Omit<User, 'password'>;

// Interfaces para diferentes contextos de usuario
export interface DirectorProfile extends User {
  role: UserRole.DIRECTOR;
  schoolId?: number;
  permissions?: string[];
}

export interface DocenteProfile extends User {
  role: UserRole.DOCENTE;
  subjects?: string[];
  grades?: string[];
  employeeId?: string;
}

export interface EstudianteProfile extends User {
  role: UserRole.ESTUDIANTE;
  studentId?: string;
  grade?: string;
  section?: string;
  parentIds?: number[];
}

export interface PadreProfile extends User {
  role: UserRole.PADRE;
  studentIds?: number[];
  relationshipType?: 'padre' | 'madre' | 'tutor' | 'abuelo' | 'otro';
}