"use client";
import React, { useState, useEffect } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Button,
  Card,
  CardHeader,
  Textarea,
  Divider,
  Input,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import {
  CirclePlus,
  Eye,
  EyeOff,
  Trash,
  Plus,
  FileCheck,
  FileX,
  CheckCircle2,
  CircleX,
} from "lucide-react";
// Clave para almacenar en localStorage
const STORAGE_KEY = "notes_positions";
const initialPracticas = [
  {
    id: 1,
    nombreEstudiante: "Ana belen García Casas",
    empresa: "TechCorp",
    fase: 3,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      {
        title: "weon tonto",
        content:
          "Contenido de la nota 1sdfkjashdjklfhkjasdhfkjashdkjfhkljasdhfklhaslkjdhflkahsdkjfhaksjhdfkjhsadkjfhkajshdfkjhaskdjfhlkas",
      },
      {
        title: "weon tonto",
        content:
          "Contenido de la nota 1sdfkjashdjklfhkjasdhfkjashdkjfhkljasdhfklhaslkjdhflkahsdkjfhaksjhdfkjhsadkjfhkajshdfkjhaskdjfhlkas",
      },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
      { title: "Título 3", content: "Contenido de la nota 3" },
      { title: "Título 3", content: "Contenido de la nota 3" },
      { title: "Título 3", content: "Contenido de la nota 3" },
      { title: "Título 3", content: "Contenido de la nota 3" },
      { title: "Título 3", content: "Contenido de la nota 3" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: [
      "1Contenido de la notasdkljfaslkdjhfkjshldkjfhasdkjfh 1sdfkjashdjklfhkjasdhfkjashdkjasdasfhkljasdhfklhaslkjdhflkahsdkjfhaksjhdfkjhsa",
      "2debe leer todos los capitulos de Jaime Donoso sin participar en actos comunistas  o de ambito zeczual sin concentimiento",
      "3ser mas vio pa la wea",
      "242leer todos los capitulos de Jaime Donoso",
      "4ser mas vio pa la wea",
      "leer todos los capitulos de Jaime Donoso",
      "ser mas vio pa la wea",
      "leer todos los capitulos de Jaime Donoso",
      "Contenido de la nota 1sdfkjashdjklfhkjasdhfkjashdkjfhkljasdhfklhaslkjdhflkahsdkjfhaksjhdfkjhsadkjfhkajshdfkjhaskdjfhlkas",
      "leer todos los capitulos de Jaime Donoso",
      "ser mas vio pa la wea",
      "leer todos los capitulos de Jaime Donoso",
      "ser mas vio pa la wea",
      "leer todos los capitulos de Jaime Donoso",
      "ser mas vio pa la wea",
      "leer todos los capitulos de Jaime Donoso",
      "ser mas vio pa la wea",
      "leer todos los capitulos de Jaime Donoso",
      "ser mas vio pa la wea",
      "leer todos los capitulos de Jaime Donoso",
      "ser mas vio pa la wea",
      "leer todos los capitulos de Jaime Donoso",
      "ser mas vio pa la wea",
      "leer todos los capitulos de Jaime Donoso",
    ],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "",
  },
  {
    id: 2,
    nombreEstudiante: "Juan Carlos Perez Gomez",
    empresa: "TechCorp",
    fase: 2,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      { title: "Título 1", content: "Contenido de la nota 1" },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: ["tarea1", "tarea2", "tarea3"],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "https://example.com/memoria",
  },
  {
    id: 3,
    nombreEstudiante: "Maria Fernanda Lopez Rodriguez",
    empresa: "TechCorp",
    fase: 1,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      { title: "Título 1", content: "Contenido de la nota 1" },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: ["tarea1", "tarea2", "tarea3"],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "https://example.com/memoria",
  },
  {
    id: 4,
    nombreEstudiante: "Pedro Sanchez",
    empresa: "TechCorp",
    fase: 2,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      { title: "Título 1", content: "Contenido de la nota 1" },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: ["tarea1", "tarea2", "tarea3"],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "https://example.com/memoria",
  },
  {
    id: 5,
    nombreEstudiante: "Laura Martinez",
    empresa: "TechCorp",
    fase: 1,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      { title: "Título 1", content: "Contenido de la nota 1" },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: ["tarea1", "tarea2", "tarea3"],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "https://example.com/memoria",
  },
  {
    id: 6,
    nombreEstudiante: "Carlos Ramirez",
    empresa: "TechCorp",
    fase: 3,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      { title: "Título 1", content: "Contenido de la nota 1" },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: ["tarea1", "tarea2", "tarea3"],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "https://example.com/memoria",
  },
  {
    id: 7,
    nombreEstudiante: "Sofia Fernandez",
    empresa: "TechCorp",
    fase: 2,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      { title: "Título 1", content: "Contenido de la nota 1" },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: ["tarea1", "tarea2", "tarea3"],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "https://example.com/memoria",
  },
  {
    id: 8,
    nombreEstudiante: "Luisa Gomez",
    empresa: "TechCorp",
    fase: 1,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      { title: "Título 1", content: "Contenido de la nota 1" },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: ["tarea1", "tarea2", "tarea3"],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "https://example.com/memoria",
  },
  {
    id: 9,
    nombreEstudiante: "Diego Torres",
    empresa: "TechCorp",
    fase: 2,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      { title: "Título 1", content: "Contenido de la nota 1" },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: ["tarea1", "tarea2", "tarea3"],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "https://example.com/memoria",
  },
  {
    id: 10,
    nombreEstudiante: "Mariana Rodriguez",
    empresa: "TechCorp",
    fase: 1,
    estado: "pendiente",
    fechaSolicitud: "2023-08-01",
    fechaInicio: "2023-09-01",
    fechaTermino: "2023-09-30",
    comentarios: [""],
    notasCOO: [
      { title: "Título 1", content: "Contenido de la nota 1" },
      { title: "Título 2", content: "Contenido de la nota 2" },
      { title: "Título 3", content: "Contenido de la nota 3" },
    ],
    correoSupervisor: "supervisor@gmail.com",
    tareas: ["tarea1", "tarea2", "tarea3"],
    area: [
      "Backend",
      "Frontend",
      "Fullstack",
      "Base de datos",
      "Redes",
      "Seguridad",
      "Simulacion",
    ],
    informe: "https://example.com/informe",
    memoria: "https://example.com/memoria",
  },
];
// Simulando las notas obtenidas del servidor (backend)
const notas_fetch = [
  {
    id: "1",
    title: "Título 1",
    content:
      "Contenido de la nota 1sdfkjashdjklfhkjasdhfkjashdkjfhkljasdhfklhaslkjdhflkahsdkjfhaksjhdfkjhsadkjfhkajshdfkjhaskdjfhlkas",
    x: 0,
    y: 0,
  },
  {
    id: "2",
    title: "Título 2",
    content: "Contenido de la nota 2",
    x: 0,
    y: 50,
  },
  {
    id: "3",
    title: "Título 3",
    content: "Contenido de la nota 3",
    x: 0,
    y: 100,
  },
];

const size_note = { w: 400, h: 220 };

// Obtener las notas almacenadas en localStorage y sincronizarlas con `notas_fetch`
const syncWithLocalStorage = () => {
  const storedNotes =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  const parsedStoredNotes = storedNotes ? JSON.parse(storedNotes) : [];

  // Sincronizar `notas_fetch` con las posiciones guardadas en `localStorage`
  const updatedNotes = notas_fetch.map((note) => {
    const storedNote = parsedStoredNotes.find(
      (stored: any) => stored.id === note.id
    );
    return storedNote ? { ...note, x: storedNote.x, y: storedNote.y } : note;
  });

  // Eliminar notas que están en `localStorage` pero no en `notas_fetch`
  const filteredStoredNotes = parsedStoredNotes.filter((stored: any) =>
    notas_fetch.some((note) => note.id === stored.id)
  );

  if (filteredStoredNotes.length !== parsedStoredNotes.length) {
    // Si hubo cambios, actualizar el `localStorage` eliminando las notas huérfanas
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredStoredNotes));
  }

  return updatedNotes;
};

const DraggableNote = ({
  id,
  title,
  content,
  x,
  y,
  onDragEnd,
  onEditNote,
  onDeleteNote,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: isEditing,
  });
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEditNote(id, editedTitle, editedContent); // Actualiza el título y contenido de la nota
  };

  const style: React.CSSProperties = {
    position: "absolute",
    top: `${y}px`,
    left: `${x}px`,
    transform: CSS.Translate.toString(transform), // Aplica la transformación mientras arrastras
    backgroundColor: "lightyellow",
    paddingTop: "5px",
    paddingInline: "10px",
    borderRadius: "8px",
    cursor: isEditing ? "text" : "grab", // Si está en edición, el cursor será de texto
    minWidth: `${size_note.w / 3}px`,
    minHeight: `${size_note.h / 2}px`,
    maxHeight: `${size_note.h}px`,
    maxWidth: `${size_note.w}px`,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    pointerEvents: "auto",
    zIndex: 100,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isEditing ? {} : { ...attributes, ...listeners })} // Solo aplicar atributos y listeners si no está editando
      onMouseUp={onDragEnd}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <>
          <input
            autoFocus
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)} // Actualizamos el título
            placeholder="Título"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
              backgroundColor: "transparent",
            }}
            maxLength={24}
          />
          <Divider className="my-3" orientation="horizontal" />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)} // Actualizamos el contenido
            placeholder="Contenido"
            rows={3}
            maxLength={200}
            style={{
              border: "none",
              outline: "none",
              resize: "none",
              padding: "20px",
              flex: "1",
              marginBottom: "10px",
              backgroundColor: "transparent",
            }}
          />
          <Button size="sm" color="success" onClick={handleSave}>
            Guardar
          </Button>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center ">
            <h1
              style={{
                fontWeight: "bold",
                textAlign: "center",
                wordWrap: "break-word",
                alignSelf: "flex-start",
              }}
            >
              {title}
            </h1>
            <div className="flex items-center ">
              <Button
                size="sm"
                color="danger"
                onClick={() => onDeleteNote(id)}
                style={{ backgroundColor: "transparent" }}
              >
                <Trash stroke="red" />
              </Button>
            </div>
          </div>
          <Divider className="my-2" />
          <div
            className="overflow-auto" // Permitir el scroll cuando el contenido es demasiado largo
            style={{
              wordWrap: "break-word", // Romper palabras largas
              overflowWrap: "break-word", // Asegura que las palabras largas no se salgan del contenedor
              maxWidth: "380px", // Limitar el ancho máximo
              maxHeight: "220px", // Limitar la altura máxima
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE y Edge
            }}
          >
            {content}
          </div>
        </>
      )}
    </div>
  );
};
type Practica = {
  id: number;
  nombreEstudiante: string;
  empresa: string;
  fase: number;
  estado: string;
  fechaSolicitud: string;
  fechaInicio: string;
  fechaTermino: string;
  comentarios: string[];
  notasCOO: { title: string; content: string }[];
  correoSupervisor: string;
  tareas: string[];
  area: string[];
  informe: string;
  memoria: string;
};
export default function NotesArea() {
  const [notes, setNotes] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [active, setActive] = useState(false);
  const [practicas, setPracticas] = useState(initialPracticas);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [selectedPractica, setSelectedPractica] = useState<Practica>(
    practicas[0]
  );
  // Obtener los límites del área visible
  const getScreenLimits = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return { screenWidth, screenHeight };
  };

  // Sincronizar las notas con localStorage y establecer el estado inicial
  useEffect(() => {
    const syncedNotes = syncWithLocalStorage();
    setNotes(syncedNotes);
    setIsInitialized(true); // Indica que las notas ya están sincronizadas
  }, []);

  // Guardar las notas en localStorage cada vez que cambien las posiciones
  useEffect(() => {
    if (isInitialized) {
      const notesToSave = notes.map(({ id, x, y, title, content }: any) => ({
        id,
        x,
        y,
        title,
        content,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notesToSave));
    }
  }, [notes, isInitialized]);

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;

    if (!delta) {
      return; // Si no hay delta, no hacemos nada
    }

    const { screenWidth, screenHeight } = getScreenLimits();

    // Encuentra la nota que se está moviendo y actualiza su posición
    setNotes((prevNotes: any) =>
      prevNotes.map((note: any) => {
        if (note.id === active.id) {
          let newX = note.x + delta.x;
          let newY = note.y + delta.y;
          // Limitar las coordenadas dentro de los límites de la pantalla
          newX = Math.max(0, Math.min(newX, screenWidth - size_note.w * 1.5));
          newY = Math.max(0, Math.min(newY, screenHeight - size_note.h * 1.1));

          return {
            ...note,
            x: newX,
            y: newY,
          };
        }
        return note;
      })
    );
  };

  const handleAddNote = () => {
    // Encuentra el ID más alto de las notas actuales
    const maxId =
      notes.length > 0
        ? Math.max(...notes.map((note) => parseInt(note.id)))
        : 0;

    // Crea una nueva nota con un ID único basado en el máximo actual
    const newNote = {
      id: `${maxId + 1}`, // Nuevo ID es el máximo + 1
      title: `Nueva Nota`,
      content: `Contenido de la nueva nota`,
      x: 0,
      y: notes.length * 50, // Posicionar debajo de la última nota
    };

    setNotes([...notes, newNote]);
  };

  const handleEditNote = (id: string, newTitle: string, newContent: string) => {
    setNotes((prevNotes: any) =>
      prevNotes.map((note: any) =>
        note.id === id
          ? { ...note, title: newTitle, content: newContent }
          : note
      )
    );
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes: any) =>
      prevNotes.filter((note: any) => note.id !== id)
    );
    // Actualizamos el localStorage eliminando las notas borradas
    const storedNotes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updatedStoredNotes = storedNotes.filter(
      (note: any) => note.id !== id
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStoredNotes));
  };
  // No renderizamos las notas hasta que estén completamente sincronizadas

  return (
    <main className="flex-1 overflow-auto w-[91.99vw] h-[99.99vh] p-[1.5rem]">
      {active && (
        <div
          className="w-[90vw] h-[90vh] text-center text-2xl font-bold absolute "
          style={{ pointerEvents: "none", zIndex: 100 }}
        >
          <DndContext onDragEnd={handleDragEnd}>
            {notes.map((note: any) => (
              <DraggableNote
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                x={note.x}
                y={note.y}
                onDragEnd={handleDragEnd}
                onEditNote={handleEditNote} // Pasamos la función de editar
                onDeleteNote={handleDeleteNote} // Pasamos la función de eliminar
              />
            ))}
          </DndContext>
        </div>
      )}
      <div className="flex justify-between items-center mb-[2rem]">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de Prácticas Profesionales
        </h1>
        <div className="flex space-x-2">
          <Button
            variant="bordered"
            isDisabled={!active}
            size="sm"
            title="Agregar nota general"
            onClick={handleAddNote}
            style={{ backgroundColor: "white" }}
          >
            Agregar nota
            <CirclePlus />
          </Button>
          <Button
            variant="bordered"
            size="sm"
            title="Agregar nota general"
            onClick={() => setActive(!active)}
            style={{ backgroundColor: "white" }}
          >
            {active && <EyeOff />} {!active && <Eye />}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="max-h-[87vh]">
          <div
            className="min-h-[400px] overflow-y-auto p-[1rem]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              pointerEvents: active ? "none" : "auto",
            }}
          >
            {practicas.map((practica) => (
              <div
                key={practica.id}
                className={`p-4 mb-4 rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${
                  selectedPractica.id === practica.id
                    ? "bg-blue-100 border-l-4 border-blue-500"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setSelectedPractica(practica)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="font-semibold text-lg">
                      {practica.nombreEstudiante}
                    </h1>
                    <p className="text-sm text-gray-600">{practica.empresa}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      practica.estado === "Activa"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {practica.estado}
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>Fase: {practica.fase}</span>
                  <span>Solicitado: {practica.fechaSolicitud}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* Detalles de la práctica seleccionada */}
        <Card className="max-h-[87vh]">
          <CardHeader className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">
                {selectedPractica.nombreEstudiante}
              </h1>
              <h2 className="text-1xl font-semibold">
                {selectedPractica.empresa}
              </h2>
            </div>
            <Button variant="bordered" size="md" color="danger">
              Rechazar Práctica
            </Button>
          </CardHeader>

          <div className="space-y- p-[0.8rem]">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="border-r-2">
                <h4 className="font-semibold">Fase Actual</h4>
                <p>{selectedPractica.fase}</p>
              </div>
              <div className="border-r-2">
                <h4 className="font-semibold ">Estado</h4>
                <Chip
                  color={
                    selectedPractica.estado === "pendiente"
                      ? "danger"
                      : "success"
                  }
                >
                  {selectedPractica.estado}
                </Chip>
              </div>
              <div className="border-r-2">
                <h4 className="font-semibold ">Fecha de Solicitud</h4>
                <p>{selectedPractica.fechaSolicitud}</p>
              </div>
              <div>
                <h4 className="font-semibold ">Fecha de Inicio</h4>
                <p>{selectedPractica.fechaInicio}</p>
              </div>
              <div className="border-r-2">
                <h4 className="font-semibold ">Fecha de Término</h4>
                <p>{selectedPractica.fechaTermino}</p>
              </div>
              <div className="border-r-2">
                <h4 className="font-semibold ">Correo del Supervisor</h4>
                <p>{selectedPractica.correoSupervisor}</p>
              </div>
              <div className="border-r-2 flex flex-col justify-center items-center">
                <h4 className="font-semibold ">Informe</h4>
                {selectedPractica.informe !== "" ? <FileCheck /> : <FileX />}
              </div>
              <div className="border-r-2 flex flex-col justify-center items-center">
                <h4 className="font-semibold ">Memoria</h4>
                {selectedPractica.memoria !== "" ? <FileCheck /> : <FileX />}
              </div>
            </div>
            <Divider className="my-1" orientation="horizontal" />
            <div>
              <h4 className="font-semibold mb-2">Áreas</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedPractica.area.map((area, index) => (
                  <Chip key={index} color="secondary">
                    {area}
                  </Chip>
                ))}
              </div>
            </div>
            <Divider className="my-1" orientation="horizontal" />
            <div className="grid grid-cols-2 gap-x-4 text-center">
              <h4 className="font-semibold ">Tareas</h4>
              <h4 className="font-semibold ">Rechazadas</h4>
              <div className="max-h-[15vh] w-full rounded-md border p-2 overflow-auto">
                <div>
                  {selectedPractica.tareas.map((tarea, index) => (
                    <div key={index}>
                      {tarea.length >= 40 ? (
                        <Tooltip content={tarea}>
                          <div className="flex items-start space-x-2 mb-2">
                            <CheckCircle2
                              className="h-5 w-5 text-green-500 flex-shrink-0"
                              onClick={() => console.log("click")}
                            />
                            <p className="text-sm">{`${tarea.substring(
                              0,
                              40
                            )}...`}</p>
                          </div>
                        </Tooltip>
                      ) : (
                        <div className="flex items-start space-x-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{tarea}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="max-h-[15vh] w-full rounded-md border p-2 overflow-auto">
                <div>
                  {selectedPractica.tareas.map((tarea, index) => (
                    <div key={index}>
                      {tarea.length >= 40 ? (
                        <Tooltip content={tarea}>
                          <div className="flex items-start space-x-2 mb-2">
                            <CircleX
                              className="h-5 w-5 text-red-500 flex-shrink-0"
                              onClick={() => console.log("click")}
                            />
                            <p className="text-sm">{`${tarea.substring(
                              0,
                              40
                            )}...`}</p>
                          </div>
                        </Tooltip>
                      ) : (
                        <div className="flex items-start space-x-2 mb-2">
                          <CircleX
                            className="h-5 w-5 text-red-500 flex-shrink-0"
                            onClick={() => console.log("clickno")}
                          />
                          <span className="text-sm">{tarea}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Divider className="mt-2" orientation="horizontal" />
            <div>
              <h4 className="font-semibold">Notas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="space-y-4 overflow-auto"
                  style={{
                    maxHeight: "29vh",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    pointerEvents: active ? "none" : "auto",
                  }}
                >
                  {selectedPractica.notasCOO.map((nota, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-3 rounded-lg"
                      style={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <h5 className="font-semibold">{nota.title}</h5>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteNote(index.toString())}
                        >
                          Eliminar
                        </Button>
                      </div>
                      <p className="text-sm mt-1">{nota.content}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-2 max-h-[29vh]">
                  <Input
                    placeholder="Título de la nota"
                    value={newNote.title}
                    onChange={(e) =>
                    setNewNote({ ...newNote, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Contenido de la nota"
                    value={newNote.content}
                    minRows={5}
                    maxRows={5}
                    onChange={(e) =>
                    setNewNote({ ...newNote, content: e.target.value })
                    }
                  />
                  <div className="flex flex-col gap-4">
                  <Button onClick={handleAddNote}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Nota
                  </Button>
                  <Button onClick={handleAddNote}>
                    <Plus className="h-4 w-4 mr-2" />
                    Aceptar Práctica
                  </Button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
