"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
  Accordion,
  AccordionItem,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { listarArea } from "@/api/coo/solicitudes";
import {HelpCircle} from "lucide-react";

interface area {
  idArea: string;
  nombre: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  areas: area[];
}
interface TaskFormProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
export default function TaskForm({ tasks, setTasks }: TaskFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [areas, setAreas] = useState<area[]>([]);
  const [areaSelected, setAreaSelected] = useState<string[]>([]);
  const [selectKey, setSelectKey] = useState(0); // Clave para forzar re-render

  useEffect(() => {
    listarArea().then((res) => {
      setAreas(res);
    });
  }, []); // Dependencias vacías para que se ejecute solo una vez

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && description && areaSelected.length > 0) {
      const selectedAreas = areas.filter((area) =>
        areaSelected.includes(area.idArea.toString())
      );
      const newTask = {
        id: Date.now().toString(),
        name,
        description,
        areas: selectedAreas,
      };
      setTasks([...tasks, newTask]);
      setName("");
      setDescription("");
      setAreaSelected([]); // Limpia el estado seleccionado
      setSelectKey((prevKey) => prevKey + 1); // Cambia la clave para desmontar y montar el componente
    } else {
      alert("Por favor llene todos los campos");
    }
  };

  return (
    <div
      className="grid grid-cols-2 gap-4 "
      style={{ gridTemplateColumns: "45% 50%" }}
    >
      <Card className="flex-1 overflow-hidden">
        <CardHeader >
          <h1>Ingresa las tarea</h1>
          <Tooltip content="Ingresa las actividades que debe cumplir el estudiante en practica mientras este en la empresa." showArrow={true}>
            <HelpCircle size={20} color="grey"/>
          </Tooltip>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la tarea"
              required
              startContent={<Tooltip content='Ingrese un nombre descriptivo para la actividad a realizar'><HelpCircle size={20} color='gray'/></Tooltip>}
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la tarea"
              required
              startContent={<Tooltip content='Ingrese una breve descripcion de la actividad a realizar'><HelpCircle size={20} color='gray'/></Tooltip>}
            />
            {/* Clave dinámica para forzar re-render */}
            <Select
              key={selectKey}
              className="max-w-xs"
              value={areaSelected}
              placeholder="Selecciona un área"
              label="Área y tecnologias"
              selectionMode="multiple"
              onSelectionChange={(values) =>
                setAreaSelected(Array.from(values as Iterable<string>))
              }
              startContent={<Tooltip content='Seleccione las areas y/o tecnologias relacionadas con la actividad descrita'><HelpCircle size={20} color='gray'/></Tooltip>}
            >
              {areas.map((area) => (
                <SelectItem key={area.idArea} value={area.idArea}>
                  {area.nombre}
                </SelectItem>
              ))}
            </Select>
            <Button type="submit">Guardar Tarea</Button>
          </form>
        </CardBody>
      </Card>

      <Card className="flex-1 max-h-[400px] overflow">
        <CardHeader>
          <h1>Lista de Tareas</h1>
        </CardHeader>
        <Divider />
        <CardBody className="p-2">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Accordion key={task.id} className={`bg-gray-100 border-b-4 border-gray-300 ${tasks[0].id === task.id ? 'rounded-t-lg' : ''}`}>
                <AccordionItem
                  aria-label={task.name}
                  title={task.name}
                  className={"m-t-2"}
                >
                  <Divider />
                  <h2>{task.description}</h2>
                  
                  {task.areas.map((area) => (
                    <Chip size="sm" key={area.idArea} color="secondary">
                      {area.nombre}
                    </Chip>
                  ))}
                </AccordionItem>
              </Accordion>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground ">
              No hay tareas guardadas.
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
