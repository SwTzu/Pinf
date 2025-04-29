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
  Accordion,
  AccordionItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@nextui-org/react";
import {
  CirclePlus,
  Eye,
  EyeOff,
  Trash,
  FileCheck,
  FileX,
  CircleX,
  CircleCheckBig,
  FilePlus2,
  Send,
} from "lucide-react";
import { Solicitudes, updateNotas } from "../../../api/coo/solicitudes";
import { updateFase, getInforme, dowload } from "@/api/coo/solicitudes";
import toast, { Toaster } from "react-hot-toast";
import ContentModal from "@/components/Tablas/TabCoo/ContentModal";
import {Task, notaCoo, area} from "@/types/interfaces";
import { Practica } from "@/types/Practica";
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
              fontSize: "0.98rem",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            {content}
          </div>
        </>
      )}
    </div>
  );
};
export default function Workspace() {
  const [notes, setNotes] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [active, setActive] = useState(false);
  const [practicas, setPracticas] = useState<Practica>();
  const [notesCOO, setNotesCOO] = useState<notaCoo[]>([]);
  const [newNote, setNewNote] = useState<notaCoo>({
    id: 0,
    title: "",
    content: "",
  });
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onOpenChange: onDrawerOpenChange,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [selectedPractica, setSelectedPractica] = useState<Practica>({
    id: 0,
    nombreEstudiante: "",
    rutEstudiante: "",
    razonSocial: "",
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
    informe: false,
    memoria: false,
  });
  const [informe, setInforme] = useState({
    aspectos_generales: {
      capacidad: "1",
      responzabilidad: "1",
      asistencia: "1",
      comportamiento: "1",
      adaptabilidad: "1",
      iniciativa: "1",
    },
    aspectos_tecnicos: {
      solucion: "1",
      conocimientos: "1",
      organizacion: "1",
      decision: "1",
    },
    aspectos_comunicacionales: {
      comunicacion_escrita: "1",
      comunicacion_oral: "1",
    },
    preguntas: [
      {
        id: 1,
        respuesta: "true",
        comentario: "Comentario 1",
      },
      {
        id: 2,
        respuesta: "true",
        comentario: "Comentario 2",
      },
      {
        id: 3,
        respuesta: "true",
        comentario: "Comentario 3",
      },
      {
        id: 4,
        respuesta: "true",
        comentario: "Comentario 4",
      },
      {
        id: 5,
        respuesta: "true",
        comentario: "Comentario 5",
      },
      {
        id: 6,
        respuesta: "true",
        comentario: "Comentario 6",
      },
      {
        id: 7,
        respuesta: "true",
        comentario: "Comentario 7",
      },
      {
        id: 8,
        respuesta: "true",
        comentario: "Comentario 8",
      },
    ],
    opinion: "Opinion",
    nota: "",
    idSolicitud: 0,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const Token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  // Obtener los límites del área visible
  const getScreenLimits = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return { screenWidth, screenHeight };
  };
  function getSolicitudes(Token: string) {
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
              estadoString = "Coordinación";
              break;
            case 6:
              estadoString = "Iniciada";
              break;
            case 7:
              estadoString = "Memoria/informe";
              break;
            case 8:
              estadoString = "Revisión evaluación";
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
        setNotesCOO(updatedPracticas[0].notasCOO);
        setSelectedPractica(updatedPracticas[0]);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    if (practicas === undefined) {
      getSolicitudes(Token);
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
  const handleInforme = (idSolicitud: number) => {
    getInforme(idSolicitud).then((res) => {
      if (res.informe != undefined) {
        setInforme(res.informe.formulario);
        setInforme((prevInforme) => ({
          ...prevInforme,
          nota: res.informe.nota,
          idSolicitud: idSolicitud,
        }));
        onOpen();
      } else {
        alert("Error al obtener el informe");
      }
    });
  };
  const handleModPractica = (idSolicitud: number, fase: number) => {
    updateFase(Token, idSolicitud, fase).then((res) => {
      if (res.status === 200) {
        toast.success("Fase actualizada correctamente");
      } else {
        toast.error("Error al actualizar la fase");
      }
    });
  };
  const handleRechazo = (onDrawerClose: () => void) => {
    updateFase(Token, selectedPractica.id, 0, motivoRechazo).then((res) => {
      if (res) {
        toast.success("Carta rechazada correctamente");
        setMotivoRechazo("");
        onDrawerClose();
        //actualizar la lista de solicitudes
        getSolicitudes(Token);
      } else {
        toast.error("Error al rechazar la carta");
      }
    });
  };
  const handleDeleteNoteCoo = (id: number) => {
    // Filtra las notas eliminadas localmente
    const newNotes = selectedPractica.notasCOO?.filter(
      (note) => note.id !== id
    );

    // Realiza la actualización en el backend
    updateNotas(Token, selectedPractica.id, newNotes).then((res) => {
      if (res) {
        toast.success("Nota eliminada correctamente");
        // Actualiza el estado asegurando una nueva referencia del objeto
        setSelectedPractica((prevPractica) => ({
          ...prevPractica,
          notasCOO: newNotes ? [...newNotes] : [],
        }));
      } else {
        toast.error("Error al eliminar la nota");
      }
    });
  };
  const handleAddNoteCoo = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error("El título y el contenido de la nota son obligatorios");
      return;
    }
  
    // Generar un nuevo ID para la nota (puedes mejorarlo con un generador único si es necesario)
    const newNoteWithId = {
      ...newNote,
      id:
        (selectedPractica.notasCOO?.length
          ? Math.max(...selectedPractica.notasCOO.map((note) => note.id))
          : 0) + 1,
    };
  
    // Agregar la nueva nota a las notas actuales localmente
    const updatedNotes = selectedPractica.notasCOO
      ? [...selectedPractica.notasCOO, newNoteWithId]
      : [newNoteWithId];
    updateNotas(Token, selectedPractica.id, updatedNotes).then((res) => {
      if (res) {
        toast.success("Nota agregada correctamente");
        // Actualizar el estado local con la nueva nota
        setSelectedPractica((prevPractica) => ({
          ...prevPractica,
          notasCOO: updatedNotes,
        }));
        // Limpiar el formulario de nueva nota
        setNewNote({ id: 0, title: "", content: "" });
      } else {
        toast.error("Error al agregar la nota");
      }
    });
  };
  
  return (
    <main className="flex-1 overflow-auto w-[91.99vw] h-[99.99vh] p-[1.5rem]">
      <Toaster />
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
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onOpenChange}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="3xl"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className=" min-h-[85vh]">
          {(onModalClose) => (
            <>
              <ModalHeader className="flex justify-between items-center pr-[4rem] pt-[1rem]">
                <div className="flex flex-row gap-2">
                  <h1 className="text-3xl font-bold text-black-900">Informe</h1>
                  <Chip
                    color={parseFloat(informe.nota) > 4 ? "success" : "danger"}
                    variant="flat"
                    size="lg"
                  >
                    Nota: {informe.nota}
                  </Chip>
                </div>
              </ModalHeader>
              <ModalBody>
                {informe !== null && <ContentModal informe={informe} />}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Drawer
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
        }}
        isOpen={isDrawerOpen}
        onOpenChange={onDrawerOpenChange}
        size="2xl"
      >
        <DrawerContent>
          {(onDrawerClose) => (
            <>
              <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 p-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-black-500"
                    size="sm"
                    variant="light"
                    onPress={onDrawerClose}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>
                <div className="w-full flex justify-between items-center gap-2">
                  <h1 className="text-lg font-bold text-black-500">
                    RECHAZAR CARTA DE ACEPTACIÓN
                  </h1>
                  <Button
                    className="font-medium text-small text-black-500 z-51"
                    size="sm"
                    startContent={<CircleX color="red" />}
                    variant="flat"
                    color="danger"
                    onPress={() => {
                      onDrawerClose();
                    }}
                  >
                    Cerrar
                  </Button>
                </div>
              </DrawerHeader>
              <DrawerBody className="pt-16">
                <div className="flex flex-col gap-2 py-4 ">
                  <h1 className="text-lg font-bold text-black-500">
                    Motivo de rechazo
                  </h1>
                  <p className="text-medium text-default-500 mb-4">
                    Por favor, ingrese el motivo por el cual rechaza la carta de
                    aceptación.
                  </p>
                  <div className="flex flex-col gap-4">
                    <Textarea
                      placeholder="Ingrese motivo de rechazo"
                      value={motivoRechazo}
                      onValueChange={setMotivoRechazo}
                      variant="bordered"
                      rows={5}
                      size="lg"
                      isClearable
                      onClear={() => toast.success("Motivo de rechazo borrado")}
                      className="w-full h-full"
                      maxLength={170}
                    />
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  color="danger"
                  onPress={() => handleRechazo(onDrawerClose)}
                  className="w-full"
                  variant="flat"
                  startContent={<Send />}
                  isDisabled={!motivoRechazo.trim()}
                >
                  Rechazar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
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
                        {practica.razonSocial}
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
                          : practica.estado === "Coordinación"
                          ? "bg-indigo-100 text-indigo-800"
                          : practica.estado === "Iniciada"
                          ? "bg-teal-100 text-teal-800"
                          : practica.estado === "Memoria/informe"
                          ? "bg-orange-100 text-orange-800"
                          : practica.estado === "Revisión evaluación"
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
            <div className="flex space-x-2 items-center">
              <Button
                onPress={() => {
                  if (
                    confirm("¿Está seguro de que desea aceptar esta práctica?")
                  ) {
                    handleModPractica(
                      selectedPractica.id,
                      selectedPractica.fase + 1
                    );
                    getSolicitudes(Token);
                  }
                }}
                size="md"
                color={
                  selectedPractica.fase === 5 || selectedPractica.fase === 8
                    ? "success"
                    : "default"
                }
                variant="bordered"
                isDisabled={
                  selectedPractica.fase === 5 || selectedPractica.fase === 8
                    ? false
                    : true
                }
                startContent={<CircleCheckBig size={20} />}
              >
                Aceptar Práctica
              </Button>
              <Button
                variant="bordered"
                size="md"
                color="danger"
                onPress={() => {
                  if (
                    confirm(
                      "¿Está seguro de que desea rechazar e interrumpir esta práctica?"
                    )
                  ) {
                    onDrawerOpen();
                  }
                }}
                startContent={<CircleX size={20} />}
              >
                Rechazar Práctica
              </Button>
            </div>
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
                <h4 className="font-semibold text-center">Fecha de Inicio</h4>
                <p className="text-center">
                  {new Date(selectedPractica.fechaInicio).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>

              <div className=" text-center">
                <h4 className="font-semibold text-center">Fecha de Término</h4>
                <p className="text-center">
                  {new Date(selectedPractica.fechaTermino).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
              <Divider className="col-span-4 my-2" orientation="horizontal" />
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
                {selectedPractica.informe === null || false ? (
                  <Tooltip content="Informe no disponible" color="warning">
                    <FileX />
                  </Tooltip>
                ) : (
                  <Tooltip content="Ver informe" color="success">
                    <FileCheck
                      className="hover:cursor-pointer hover:text-green-500"
                      onClick={() => {
                        handleInforme(selectedPractica.id);
                      }}
                    />
                  </Tooltip>
                )}
              </div>
              <div className="flex flex-col justify-center items-center text-center">
                <h4 className="font-semibold text-center">Memoria</h4>
                {selectedPractica.memoria === null ||
                selectedPractica.memoria === false ? (
                  <Tooltip content="Memoria no disponible" color="warning">
                    <FileX />
                  </Tooltip>
                ) : (
                  <FileCheck
                    className="hover:cursor-pointer hover:text-green-500"
                    onClick={() => {
                      dowload(selectedPractica.id)
                        .then(() => {
                          toast.success("Memoria descargada correctamente");
                        })
                        .catch(() => {
                          toast.error("Error al descargar la memoria");
                        });
                    }}
                  />
                )}
              </div>
            </div>
            <Divider className="mt-4 " orientation="horizontal" />
            <div className="flex flex-wrap gap-1 my-2 ">
              {Array.from(
                new Set(
                  selectedPractica.tareas.flatMap((task) =>
                    task.areas.map((area) => area.nombre)
                  )
                )
              ).map((areaNombre, index) => (
                <Chip key={index} color="secondary" size="sm">
                  {areaNombre}
                </Chip>
              ))}
            </div>
            <Divider orientation="horizontal" />
            <div className="grid grid-cols-2 text-center mt-2">
              <div className="w-full border-r-1">
                <h4 className="font-semibold ">Tareas</h4>
                <Divider className="mt-2" />
                <div
                  className="max-h-[48vh] w-full overflow-y-auto p-4 scrollbar-none"
                  id="boxNotas"
                >
                  <Accordion variant="splitted">
                    {selectedPractica.tareas.map((tarea: Task, index) => (
                      <AccordionItem
                        key={index}
                        aria-label={tarea.name}
                        title={tarea.name}
                      >
                        <p
                          style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            fontSize: "0.875rem",
                            color: "gray",
                          }}
                        >
                          {tarea.description}
                        </p>
                        <Divider className="my-2" />
                        {tarea.areas.map((area: area, index) => (
                          <Chip key={index} color="secondary" size="sm">
                            {area.nombre}
                          </Chip>
                        ))}
                      </AccordionItem>
                    )) || null}
                  </Accordion>
                </div>
              </div>
              <div className="w-full">
                <h4 className="font-semibold">Notas</h4>
                <Divider className="mt-2" />
                <div className="grid grid-rows-[3fr,1fr] gap-2 min-h-[48vh] max-h-[48vh]">
                  <div
                    id="boxTask"
                    className="overflow-y-auto p-2 flex flex-col justify-start scrollbar-none max-h-[48vh]"
                  >
                    {selectedPractica.notasCOO &&
                    selectedPractica.notasCOO.length > 0 ? (
                      selectedPractica.notasCOO.map((nota, index) => (
                        <div
                          key={index}
                          className="bg-[#FFFFE0] p-3 rounded-lg w-full mt-2 border-1"
                        >
                          <div className="flex justify-between items-start">
                            <h5 className="font-semibold">{nota.title}</h5>
                            <Trash
                              size={18}
                              className="hover:text-red-500"
                              onClick={() => handleDeleteNoteCoo(nota.id)}
                            />
                          </div>
                          <p className="text-sm mt-1">{nota.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="overflow-y-auto p-2 h-[10vh]">
                        <h1>No hay notas</h1>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 self-end p-2">
                    <div className="flex flex-col gap-4">
                      <Input
                        placeholder="Título de la nota"
                        variant="bordered"
                        value={newNote.title}
                        onChange={(e) =>
                          setNewNote({ ...newNote, title: e.target.value })
                        }
                      />
                      <Button
                        onPress={handleAddNoteCoo}
                        startContent={<FilePlus2 size={18} />}
                        variant="flat"
                        size="md"
                        color="primary"
                      >
                        Agregar Nota
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Contenido de la nota"
                      value={newNote.content}
                      variant="bordered"
                      minRows={4}
                      maxRows={4}
                      onChange={(e) =>
                        setNewNote({ ...newNote, content: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <Divider orientation="horizontal" />
          </div>
        </Card>
      </div>
    </main>
  );
}
