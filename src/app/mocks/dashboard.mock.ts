export interface DashboardMock {    //una “plantilla” que dice qué forma tendrán los datos.
  summary: {  //es un objeto con totales y promedios.
    totalStudents: number;
    totalTeachers: number;
    totalCourses: number;
    avgGrade: number;
  }; //arrays u objetos con la data de ejemplo.
  progress: Array<{ id:number, name:string, students:number, completedModules:number, totalModules:number }>;
  recent: Array<{title:string, subtitle:string, time:string, badge?:string}>;
  monthly: { months: string[], values: number[] };
  topStudents: Array<{name:string, grade:number, place:number}>;
}

export const DASHBOARD_MOCK: DashboardMock = {    //export const → se crea una constante que guarda la información simulada. Está tipada con DashboardMock, o sea que TypeScript valida que los datos tengan la forma correcta.
  summary: { totalStudents: 2847, totalTeachers: 342, totalCourses: 48, avgGrade: 8.7 },
  progress: [
    {id:1, name:'Matemáticas Avanzadas', students:126, completedModules:8, totalModules:10},
    {id:2, name:'Ciencias Naturales', students:98, completedModules:6, totalModules:8},
    {id:3, name:'Lenguaje y Literatura', students:134, completedModules:9, totalModules:12},
  ],
  recent: [
    {title:'Ana García completó "Álgebra Lineal"', subtitle:'Matemáticas · Hace 2 horas', time:'2h', badge:'Nuevo'},
    {title:'Evaluación programada para mañana', subtitle:'Química Orgánica · Prof. Martínez', time:'1d', badge:'Pronto'},
    {title:'Carlos Méndez entregó tarea final', subtitle:'Física · Hace 30 min', time:'30m', badge:'Completado'},
    {title:'Reunión de padres programada', subtitle:'Videollamada · Viernes 3:00 PM', time:'3d', badge:'Importante'},
    {title:'Laura Rodríguez se unió al curso', subtitle:'Historia del Arte · Nuevo estudiante', time:'5d', badge:'Nuevo'},
    {title:'Tarea pendiente de revisión', subtitle:'Literatura · 15 entregas pendientes', time:'1d', badge:'Pendiente'},
  ],
  monthly: { months:['Ene','Feb','Mar','Abr','May','Jun'], values:[50,60,70,80,75,85] },
  topStudents: [{name:'Sofía García', grade:9.8, place:1},{name:'Carlos Méndez', grade:9.5, place:2},{name:'Laura Rodríguez', grade:9.2, place:3}]
};
