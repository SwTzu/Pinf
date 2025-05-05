import { Task } from '@/types/interfaces';
export type Practica = {
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
export type empresa = {
  verificadas: number;
  total: number;
};
