"use client";
import React, { useState, useEffect } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button, Card, Input } from "@nextui-org/react";

// Clave para almacenar en localStorage
const STORAGE_KEY = "notes_positions";

// Obtener las notas almacenadas en localStorage o usar las iniciales si no existen
const getInitialNotes = () => {
  const storedNotes = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  return storedNotes
    ? JSON.parse(storedNotes)
    : [
        { id: "1", content: "Nota 1", x: 0, y: 0 },
        { id: "2", content: "Nota 2", x: 0, y: 50 },
        { id: "3", content: "Nota 3", x: 0, y: 100 },
      ];
};

const DraggableNote = ({ id, content, x, y, onDragEnd, onEditContent, onDeleteNote }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  // Solo activamos el arrastre si no estamos editando la nota
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, disabled: isEditing });

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEditContent(id, editedContent); // Actualiza el contenido de la nota
  };

  const style: React.CSSProperties = {
    position: "absolute",
    top: `${y}px`,
    left: `${x}px`,
    transform: CSS.Translate.toString(transform), // Aplica la transformación mientras arrastras
    backgroundColor: "lightyellow",
    padding: "20px",
    borderRadius: "8px",
    cursor: isEditing ? "text" : "grab", // Si está en edición, el cursor será de texto
    minWidth: "200px",
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",
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
        <input
          autoFocus
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)} // Actualizamos el estado del contenido
          onBlur={handleSave} // Guardar el contenido cuando se pierde el foco
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave(); // Guardar al presionar "Enter"
          }}
        />
      ) : (
        <>
          {content}
          <Button
            size="xs"
            color="error"
            onClick={() => onDeleteNote(id)}
            style={{ marginTop: "10px" }}
          >
            Eliminar
          </Button>
          <Button
            size="xs"
            onClick={() => handleDoubleClick()}
            style={{ marginTop: "5px" }}
          >
            Editar
          </Button>
        </>
      )}
    </div>
  );
};

export default function NotesArea() {
  const [notes, setNotes] = useState(getInitialNotes);
  const [active, setActive] = useState(true);

  // Guardar las notas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;

    if (!delta) {
      return; // Si no hay delta, no hacemos nada
    }

    // Encuentra la nota que se está moviendo y actualiza su posición
    setNotes((prevNotes: any) =>
      prevNotes.map((note: any) =>
        note.id === active.id
          ? {
              ...note,
              x: note.x + delta.x, // Actualiza la posición X
              y: note.y + delta.y, // Actualiza la posición Y
            }
          : note
      )
    );
  };

  const handleAddNote = () => {
    const newNote = {
      id: `${notes.length + 1}`,
      content: `Nueva nota ${notes.length + 1}`,
      x: 0,
      y: notes.length * 50, // Posicionar debajo de la última nota
    };
    setNotes([...notes, newNote]);
  };

  const handleEditNoteContent = (id: string, newContent: string) => {
    setNotes((prevNotes: any) =>
      prevNotes.map((note: any) => (note.id === id ? { ...note, content: newContent } : note))
    );
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes: any) => prevNotes.filter((note: any) => note.id !== id));
  };

  return (
    <div className="relative w-[91.99vw] h-[99.99vh] p-[1.5rem]">
      <Button onClick={handleAddNote}>Agregar Nota</Button>
      {active && (
        <div className="w-[90vw] h-[90vh] text-center text-2xl font-bold absolute z-50">
          Notas
          <DndContext onDragEnd={handleDragEnd}>
            {notes.map((note: any) => (
              <DraggableNote
                key={note.id}
                id={note.id}
                content={note.content}
                x={note.x}
                y={note.y}
                onDragEnd={handleDragEnd}
                onEditContent={handleEditNoteContent} // Pasamos la función de editar
                onDeleteNote={handleDeleteNote} // Pasamos la función de eliminar
              />
            ))}
          </DndContext>
        </div>
      )}

      <Card className="mb-6">
        <h1 className="text-3xl font-semibold black pt-[2rem] pl-[2rem]">Empresas no verificadas</h1>
        <div className="grid md:grid-cols-2 self-center mb-[2rem]"></div>
      </Card>
    </div>
  );
}
