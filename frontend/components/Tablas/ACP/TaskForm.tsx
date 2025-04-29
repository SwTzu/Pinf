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
import {HelpCircle, Trash} from "lucide-react";
import { area, Task } from "@/types/interfaces";
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
        description:description.replace(/\n/g, ' '),
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
              maxLength={50}
              startContent={<Tooltip content='Ingrese un nombre descriptivo para la actividad a realizar'><HelpCircle size={20} color='gray'/></Tooltip>}
            />
            <Textarea
              value={description}
              maxLength={240}
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

      <Card className="flex-1 min-h-[300px] max-h-[300px] overflow">
        <CardHeader>
          <h1>Lista de Tareas</h1>
        </CardHeader>
        <Divider />
        <CardBody className="p-2">
            {tasks.length > 0 ? (
            <Accordion >
              {tasks.map((task, index) => (
                <AccordionItem
                key={index}
                aria-label={task.name}
                title={task.name}
                subtitle={task.description.length > 20 ? `${task.description.substring(0, 20)}...` : task.description}
                startContent={
                  <Trash
                  size={20}
                  style={{ color: "gray", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "gray")}
                  onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                  />
                }
                >
                <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", fontSize: "0.875rem", color: "gray" }}>
                {task.description}
                </p>
                <Divider className="my-2" />
                {task.areas.map((area, index) => (
                <Chip key={index} color="secondary" size="sm">
                  {area.nombre}
                </Chip>
                ))}
                </AccordionItem>
              ))}
            </Accordion>
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
