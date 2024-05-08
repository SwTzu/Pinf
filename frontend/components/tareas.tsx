import { Button, Input, Textarea } from "@nextui-org/react";
import style from "../styles/tareas.module.css";
import { useEffect, useState } from "react";
export default function Tareas() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [tareas, setTareas] = useState([
    { name: "ejemplo", description: "Descripcion de la tarea" },
  ]);
  const addTask = (event) => {
    event.preventDefault();
    if (name.trim() === "" || description.trim() === "") {
      alert("Por favor, complete todos los campos antes de agregar una tarea.");
      return;
    }
    const newTask = { name, description };
    setTareas([...tareas, newTask]);
    setName(""); // Resetea el estado de name.
    setDescription(""); // Resetea el estado de description.
  };
  const deleteTask = (index) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };
  const saveTask= () =>{
    console.log(tareas);
  };
  const editTask = (index) => {
    const task = tareas[index];
    setName(task.name);
    setDescription(task.description);
    setEditIndex(index);
    setTareas(tareas.filter((_, i) => i !== index)); // Remove the task to be edited from the list
  };
  return (
    <div className={style.main}>
      <div className={style.taskconteiner}>
        <div className={style.bento}>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Ingrese tareas</h1>
            <Button size="md" type="submit" onClick={addTask}>
              <PlusIcon className="h-5 w-5" />
              <span className="sr-only">plus</span>
            </Button>
          </div>
          <form className="mt-6 space-y-4" onSubmit={addTask}>
            <div className="space-y-2">
              <h1 id="name">Nombre descriptivo</h1>
              <Input
                id="name"
                placeholder="Introduce el nombre de la tarea"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
              />
            </div>
            <div className="space-y-2">
              <h1 id="description">Descipcion</h1>
              <Textarea
                placeholder="Introce la descripcion de la tarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
              />
            </div>
          </form>
          <div className={style.botones}>
              <Button onClick={addTask} className={style.success} type="submit">
              Agregar tarea
              </Button>
              <Button onClick={saveTask} className={style.save} type="submit">
                Guardar tareas
              </Button>
            </div>
        </div>
        <div className={style.tasks}>
          <div className={style.taskTitle}>
            <h2 className="text-2xl font-bold">Tareas</h2>
          </div>
          <div
            className="mt-4 space-y-2 "
            style={{ maxHeight: "400px", overflowY: "auto"}}
          >
            {tareas.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-100 p-2 dark:bg-gray-800 "
              >
                <div className="space-y-1 w-full">
                  <h3 className="text-base font-medium text-gray-900 dark:text-gray-400 border-b-1 border-gray-900 dark:border-gray-400">
                    {task.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 flex-col gap-2">
                  <Button
                    disableAnimation
                    size="md"
                    onClick={() => editTask(index)}
                    variant="bordered"
                    className="flex justify-center items-center w-full text-gray-900 dark:text-gray-100"
                    color="primary"
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span className="sr-only">Editar tareas</span>
                  </Button>
                  <Button
                    disableAnimation
                    size="md"
                    onClick={() => deleteTask(index)}
                    variant="bordered"
                    className="flex justify-center items-center w-full "
                    color="danger"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">Eliminar tarea</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
