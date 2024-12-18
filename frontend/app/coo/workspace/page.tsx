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
import { Solicitudes, crearArea } from "../../../api/coo/solicitudes";
// Clave para almacenar en localStorage
const STORAGE_KEY = "notes_positions";

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
          <Button size="sm" color="success" onPress={handleSave}>
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
                onPress={() => onDeleteNote(id)}
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
  rutEstudiante: string;
  empresa: string;
  fase: number;
  estado: string;
  fechaSolicitud: string;
  fechaInicio: string;
  fechaTermino: string;
  comentarios: string[];
  notasCOO: { title: string; content: string }[] | null;
  correoSupervisor: string;
  tareas: Task[];
  informe: string;
  idmemoria: string;
};
interface Task {
  id: string;
  name: string;
  description: string;
  areas: area[];
}
interface area {
  idArea: number;
  nombre: string;
}
export default function Workspace() {
  const [notes, setNotes] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [active, setActive] = useState(false);
  const [practicas, setPracticas] = useState<Practica>();
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [selectedPractica, setSelectedPractica] = useState<Practica>({
    id: 0,
    nombreEstudiante: "",
    rutEstudiante: "",
    empresa: "",
    fase: 0,
    estado: "",
    fechaSolicitud: "",
    fechaInicio: "",
    fechaTermino: "",
    comentarios: [],
    notasCOO: [],
    correoSupervisor: "",
    tareas: [],
    informe: "",
    idmemoria: "",
  });
  const Token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  // Obtener los límites del área visible
  const getScreenLimits = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return { screenWidth, screenHeight };
  };
  useEffect(() => {
    if (practicas === undefined) {
      Solicitudes(Token)
        .then((res) => {
          const updatedPracticas = res.map((practica: Practica) => {
            let estadoString = "";
            switch (practica.fase) {
              case 0:
                estadoString = "Rechazado";
                break;
              case 1:
                estadoString = "Solicitado";
                break;
              case 2:
                estadoString = "Revisado";
                break;
              case 3:
                estadoString = "Firmado";
                break;
              case 4:
                estadoString = "Formularios";
                break;
              case 5:
                estadoString = "Coordinacion";
                break;
              case 6:
                estadoString = "Iniciada";
                break;
              case 7:
                estadoString = "Memoria/informe";
                break;
              case 8:
                estadoString = "Revision evaluación";
                break;
              case 9:
                estadoString = "Finalizado";
                break;
              default:
                estadoString = practica.estado;
            }
            return { ...practica, estado: estadoString };
          });
          setPracticas(updatedPracticas);
        })
        .catch((err) => console.log(err));
    }
  }, [Token, practicas]);
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

  const handlecrearArea = () => {
    crearArea("Java")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }; //<Button onPress={handlecrearArea}>Crear Area</Button>
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
            onPress={handleAddNote}
            style={{ backgroundColor: "white" }}
          >
            Agregar nota
            <CirclePlus />
          </Button>
          <Button
            variant="bordered"
            size="sm"
            title="Agregar nota general"
            onPress={() => setActive(!active)}
            style={{ backgroundColor: "white" }}
          >
            {active && <EyeOff />} {!active && <Eye />}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="min-h-[87vh]">
          <div
            className="min-h-[400px] overflow-y-auto p-[1rem]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              pointerEvents: active ? "none" : "auto",
            }}
          >
            {practicas &&
              Array.isArray(practicas) &&
              practicas.map((practica: Practica) => (
                <div
                  key={practica.id}
                  className={`p-4 mb-4 rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${
                    selectedPractica.id === practica.id
                      ? "bg-blue-100 border-l-4 border-blue-500"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedPractica(practica);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="font-semibold text-md">
                        {practica.nombreEstudiante}
                      </h1>
                      <p className="text-sm text-gray-600">
                        {practica.empresa}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        practica.estado === "Rechazado"
                          ? "bg-red-100 text-red-800"
                          : practica.estado === "Solicitado"
                          ? "bg-yellow-100 text-yellow-800"
                          : practica.estado === "Revisado"
                          ? "bg-blue-100 text-blue-800"
                          : practica.estado === "Firmado"
                          ? "bg-green-100 text-green-800"
                          : practica.estado === "Formularios"
                          ? "bg-purple-100 text-purple-800"
                          : practica.estado === "Coordinacion"
                          ? "bg-indigo-100 text-indigo-800"
                          : practica.estado === "Iniciada"
                          ? "bg-teal-100 text-teal-800"
                          : practica.estado === "Memoria/informe"
                          ? "bg-orange-100 text-orange-800"
                          : practica.estado === "Revision evaluación"
                          ? "bg-pink-100 text-pink-800"
                          : practica.estado === "Finalizado"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {practica.estado}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>Fase: {practica.fase}</span>
                    <span>
                      {new Date(practica.fechaSolicitud).toLocaleDateString(
                        "es-ES"
                      )}
                    </span>
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
              <h2 className="text-1xl font-semibold text-gray-500">
                {selectedPractica.rutEstudiante}
              </h2>
            </div>
            <Button variant="bordered" size="md" color="danger" onPress={() => {}}>
              Rechazar Práctica
            </Button>
          </CardHeader>
          <div className="p-[0.8rem]">
            <Divider className="mb-4" orientation="horizontal" />
            <div className="grid grid-cols-4 grid-rows-[auto,3fr,auto] text-center items-center">
              <div className="border-r-2 text-center">
                <h4 className="font-semibold text-center">Fase Actual</h4>
                <p className="text-center">{selectedPractica.fase}</p>
              </div>
              <div className="border-r-2 text-center">
                <h4 className="font-semibold text-center">Estado</h4>
                <Chip color="danger" className="text-center">
                  {selectedPractica.estado}
                </Chip>
              </div>
              <div className="border-r-2 text-center">
                <h4 className="font-semibold text-center">
                  Fecha de Solicitud
                </h4>
                <p className="text-center">
                  {new Date(selectedPractica.fechaSolicitud).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-center">Fecha de Inicio</h4>
                <p className="text-center">
                  {new Date(selectedPractica.fechaInicio).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
              <Divider className="col-span-4 my-2" orientation="horizontal" />
              <div className="border-r-2 text-center">
                <h4 className="font-semibold text-center">Fecha de Término</h4>
                <p className="text-center">
                  {new Date(selectedPractica.fechaTermino).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
              <div className="border-r-2 text-center items-center justify-center">
                <h4 className="font-semibold text-center">
                  Correo del Supervisor
                </h4>
                <p className="text-center">
                  {selectedPractica.correoSupervisor.length > 20 ? (
                    <Tooltip content={selectedPractica.correoSupervisor}>
                      <span>{`${selectedPractica.correoSupervisor.substring(
                        0,
                        20
                      )}...`}</span>
                    </Tooltip>
                  ) : (
                    selectedPractica.correoSupervisor
                  )}
                </p>
              </div>
              <div className="border-r-2 flex flex-col justify-center items-center text-center">
                <h4 className="font-semibold text-center">Informe</h4>
                {selectedPractica.informe !== null ? (
                  <FileCheck
                    className="hover:cursor-pointer hover:text-green-500"
                    onClick={() => {
                      console.log("tu madre");
                    }}
                  />
                ) : (
                  <FileX />
                )}
              </div>
              <div className="flex flex-col justify-center items-center text-center">
                <h4 className="font-semibold text-center">Memoria</h4>
                {selectedPractica.idmemoria !== null ? (
                  <FileCheck
                    className="hover:cursor-pointer hover:text-green-500"
                    onClick={() => {
                      console.log("tu madre");
                    }}
                  />
                ) : (
                  <FileX />
                )}
              </div>
            </div>
            <Divider className="mt-4 " orientation="horizontal" />
            <div className="m-2">
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedPractica.tareas.map((task) =>
                  task.areas.map((area, index) => (
                    <Chip key={index} color="secondary" size="sm">
                      {area.nombre}
                    </Chip>
                  ))
                )}
              </div>
            </div>
            <Divider orientation="horizontal" />
            <div className="grid grid-cols-2 gap-x-4 text-center">
              <h4 className="font-semibold ">Tareas</h4>
              <h4 className="font-semibold ">Rechazadas</h4>
              <div className="max-h-[15vh] w-full rounded-md border p-2 overflow-auto">
                <div>
                  {selectedPractica.tareas.map((tarea, index) => (
                    <div key={tarea.id}>
                      {tarea.name.length >= 40 ? (
                        <Tooltip content={tarea.name}>
                          <div className="flex items-start space-x-2 mb-2">
                            <CheckCircle2
                              className="h-5 w-5 text-green-500 flex-shrink-0"
                              onClick={() => console.log("click")}
                            />
                            <p className="text-sm">{`${tarea.name.substring(
                              0,
                              40
                            )}...`}</p>
                          </div>
                        </Tooltip>
                      ) : (
                        <div className="flex items-start space-x-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{tarea.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="max-h-[15vh] w-full rounded-md border p-2 overflow-auto">
                <div>
                  {selectedPractica.tareas.map((tarea, index) => (
                    <div key={tarea.id}>
                      {tarea.name.length >= 40 ? (
                        <Tooltip content={tarea.name}>
                          <div className="flex items-start space-x-2 mb-2">
                            <CircleX
                              className="h-5 w-5 text-red-500 flex-shrink-0"
                              onClick={() => console.log("click")}
                            />
                            <p className="text-sm">{`${tarea.name.substring(
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
                          <span className="text-sm">{tarea.name}</span>
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
                  {selectedPractica.notasCOO &&
                    selectedPractica.notasCOO.map((nota, index) => (
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
                            onPress={() => handleDeleteNote(index.toString())}
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
                    <Button onPress={handleAddNote}>
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Nota
                    </Button>
                    <Button onPress={handleAddNote}>
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
