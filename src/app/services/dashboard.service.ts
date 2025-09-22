//El que obtiene los datos
import { Injectable } from '@angular/core';   //indica que esta clase será un servicio que Angular puede inyectar en componentes
import { of, Observable } from 'rxjs';        //crea un Observable a partir de un valor fijo (el mock). Observable → es el tipo de dato que emite datos asíncronos. En vez de devolver directamente el mock, se devuelve un observable (como si viniera de un servidor real).
import { DASHBOARD_MOCK, DashboardMock } from 'src/app/mocks/dashboard.mock';

@Injectable({providedIn: 'root'})
export class DashboardService {
  // DEV: devuelve mock. En producción cambia a HttpClient.get(...)
  getDashboard(): Observable<DashboardMock> {
    return of(DASHBOARD_MOCK);
  }

  // EJEMPLO de cómo quedaría con backend:
  // constructor(private http: HttpClient) {}
  // getDashboard(): Observable<DashboardMock> {
  //   return this.http.get<DashboardMock>('http://api:3000/api/dashboard/summary');
  // }
}
