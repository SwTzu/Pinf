export interface Pregunta {
  id: number;
  respuesta: string;
  comentario: string;
}

export interface Solicitud {
  idSolicitud: number;
  nombre: string| null;
  rut: string;
  rutEmpresa: string;
  fechaSolicitud: string;
  extension: string | null;
  numeroPractica: number;
  descripcionRechazo: string | null;
  fase: number;
  supervisorCheck: boolean;
  alumnoCheck: boolean;
  calificacion: number | null;
  correoSupervisor: string;
  notasCOO: string | null;
  createdAt: string;
  updatedAt: string;
  informe: Informe | null;
  memoria: string | null;
}
export interface carta {
  idSolicitud: number;
  correoSupervisor: string;
  tareas: Task[];
  fechaInicio: string;
  fechaTermino: string;
  alumnoCheck: boolean;
  supervisorCheck: boolean;
}
export interface Tarea {
  name: string;
  description: string;
  areas: [];
}
export interface area {
  idArea: string;
  nombre: string;
}
export interface Usuario {
  rut: string;
  tipoUsuario: number;
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  telefono: string;
  correo: string;
  direccion: string;
}
export interface Task {
  id: string;
  name: string;
  description: string;
  areas: area[];
}
export interface AspectosGenerales {
  capacidad: string;
  responzabilidad: string;
  asistencia: string;
  comportamiento: string;
  adaptabilidad: string;
  iniciativa: string;
}
export interface AspectosTecnicos {
  solucion: string;
  conocimientos: string;
  organizacion: string;
  decision: string;
}
export interface AspectosComunicacionales {
  comunicacion_escrita: string;
  comunicacion_oral: string;
}
export interface Pregunta {
  id: number;
  respuesta: string;
  comentario: string;
}
export interface Informe {
  aspectos_generales: AspectosGenerales;
  aspectos_tecnicos: AspectosTecnicos;
  aspectos_comunicacionales: AspectosComunicacionales;
  preguntas: Pregunta[];
  opinion: string;
}
export type estudiante = {
  rut: string;
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  planEstudio: string;
  correo: string;
  telefono: string;
  ingreso: string;
};
export interface notaCoo {
  id: number;
  title: string;
  content: string;
}
type Practica = {
  id: number;
  nombreEstudiante: string;
  rutEstudiante: string;
  razonSocial: string;
  empresa: string;
  fase: number;
  estado: string;
  fechaSolicitud: string;
  fechaInicio: string;
  fechaTermino: string;
  comentarios: string[];
  notasCOO: { id: number; title: string; content: string }[] | null;
  correoSupervisor: string;
  tareas: Task[];
  informe: boolean | null;
  memoria: boolean | null;
};