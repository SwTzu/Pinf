"use client";
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '@/styles/body.module.css';
const initialNotes = [
  { id: '1', content: 'Nota 1' },
  { id: '2', content: 'Nota 2' },
  { id: '3', content: 'Nota 3' },
];

export default function NotesArea() {
  const [notes, setNotes] = useState(initialNotes);

  const handleOnDragEnd = (result:any) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="notes">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.body}
          >
            {notes.map((note, index) => (
              <Draggable key={note.id} draggableId={note.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: '20px',
                      backgroundColor: 'lightyellow',
                      borderRadius: '8px',
                      ...provided.draggableProps.style,
                    }}
                  >
                    {note.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};