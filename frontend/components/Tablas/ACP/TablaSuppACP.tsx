"use client";
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Spinner,
  Card,
  Checkbox,
  DateRangePicker,
  Button,
  Chip,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { backendUrl } from "@/config/config";
import {
  HelpCircle,
  Search,
  CircleHelp,
  CircleAlert,
  ContactRound,
  BadgeCheck,
} from "lucide-react";
import styles from "@/styles/est.module.css";
import TaskForm from "./TaskForm";
import { crearCarta } from "@/api/supp/solicitudes";
import DrawerInforme from "./DrawerInforme";
import toast, { Toaster } from "react-hot-toast";
import { number } from "echarts";
interface Solicitud {
  idSolicitud: number;
  rut: string;
  nombre: string;
  rutEmpresa: string;
  fechaSolicitud: string;
  extension: string | null;
  numeroPractica: number;
  descripcionRechazo: string | null;
  fase: number;
  calificacion: number | null;
  correoSupervisor: string;
  supervisorCheck: boolean;
  alumnoCheck: boolean;
  informe: boolean;
  createdAt: string;
  updatedAt: string;
}
interface carta {
  idSolicitud: number;
  correoSupervisor: string;
  tareas: Task[];
  fechaInicio: string;
  fechaTermino: string;
  supervisorCheck: boolean;
  alumnoCheck: boolean;
}
interface Task {
  id: string;
  name: string;
  description: string;
  areas: area[];
}
interface area {
  idArea: string;
  nombre: string;
}
export default function TablaSuppAcp({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState(""); // Valor de búsqueda
  const [showCardFormulario, setShowCardFormulario] = useState(false); // Para controlar la visibilidad de la card
  const [showDrawerInforme, setShowDrawerInforme] = useState(false); // Para controlar la visibilidad del drawer
  const cardFormularioRef = useRef<HTMLDivElement>(null); // Crear una referencia para el formulario
  const [isActive, setIsActive] = useState(false);
  const [carta, setCarta] = useState<carta | null>(null);
  const [value, setValue] = useState<{ start: any; end: any } | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectSolicitud, setSelectSolicitud] = useState<number>(0);
  const redireccion = () => {
    cardFormularioRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  };
  let list = useAsyncList<Solicitud>({
    async load({ signal }) {
      try {
        const res = await fetch(`${backendUrl}/supervisor/AllSolicitudes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
          signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await res.json();
        if (!Array.isArray(json)) {
          console.error("Unexpected API response", json);
          throw new Error("Invalid data format");
        }
        setIsLoading(false);
        return { items: json };
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
        return { items: [] }; // Return an empty array to prevent further errors
      }
    },
  });
  const filteredItems = useMemo(() => {
    let filtered = list.items;

    // Filtrar por valor de búsqueda (rut o empresa)
    if (filterValue) {
      filtered = filtered.filter(
        (item) =>
          item.rut.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.rutEmpresa.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    filtered = filtered.filter((item) => item.fase >= 3);

    return filtered;
  }, [list.items, filterValue]);
  const handleRowClick = (item: Solicitud) => {
    setSelectSolicitud(item.idSolicitud);
    if (item.fase === 4 && !item.supervisorCheck && !item.alumnoCheck) {
      setCarta({
        idSolicitud: item.idSolicitud,
        correoSupervisor: item.correoSupervisor,
        tareas: [],
        fechaInicio: "",
        fechaTermino: "",
        supervisorCheck: false,
        alumnoCheck: false,
      });
      setShowCardFormulario(true);
      redireccion();
      setTimeout(() => {
        cardFormularioRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (item.fase === 4 && item.supervisorCheck && !item.alumnoCheck) {
      toast.success(<h2>A la espera de la firma del alumno.</h2>, {
        position: "top-right",
      });
      setShowCardFormulario(false);
    } else if (item.fase === 5) {
      toast.success(
        <h1>
          Carta de aceptación fue firmada por el alumno. A la espera de la
          revision del coordinador
        </h1>,
        { position: "top-right" }
      );
      setShowCardFormulario(false);
    } else if (item.fase === 6) {
      toast.success(<h1>Practica en curso</h1>, { position: "top-right" });
      setShowCardFormulario(false);
    } else if (item.fase === 7 && !item.informe) {
      setShowCardFormulario(false);
      setShowDrawerInforme(true);
    } else if (item.fase === 7 && item.informe) {
      toast.success(
        <h1>
          Informe de practica enviado, a la espera de la revision del
          coordinador
        </h1>,
        { position: "top-right" }
      );
      setShowCardFormulario(false);
    } else if (item.fase === 8) {
      toast.success(
        <h1>Informe finalizado, a la espera de la revision del coordinador</h1>,
        { position: "top-right" }
      );
      setShowCardFormulario(false);
    } else if (item.fase === 9) {
      toast.success(<h1>Practica finalizada</h1>, { position: "top-right" });
      setShowCardFormulario(false);
    } else {
      toast.error(<h1>La carta de aceptación no se encuentra disponible</h1>, {
        position: "top-right",
      });
      setShowCardFormulario(false);
    }
  };

  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  if (!isLoading && filteredItems.length === 0) {
    return (
      <p className="m-[1rem] text-gray-500 font-bold">
        Aun no tienes cartas de aceptación disponibles.
      </p>
    );
  }
  const handleSubmitForum = () => {
    if (value && tasks.length > 0) {
      if (confirm("¿Está seguro de que desea guardar los datos?")) {
        const startDate = new Date(value.start);
        const endDate = new Date(value.end);

        // Sumar 1 día a cada fecha
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 1);

        const dateFormatter = new Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        setCarta((prevCarta) => {
          if (!prevCarta) return null;
          return {
            ...prevCarta,
            fechaInicio: dateFormatter.format(startDate),
            fechaTermino: dateFormatter.format(endDate),
            tareas: tasks,
            supervisorCheck: true,
          };
        });
        setTimeout(() => {
          setShowCardFormulario(false);
        }, 0);

        crearCarta({
          ...carta!,
          fechaInicio: dateFormatter.format(startDate),
          fechaTermino: dateFormatter.format(endDate),
          tareas: tasks,
          supervisorCheck: true,
        });
        setTimeout(() => {
          list.reload();
        }, 1000);
        setValue(null);
        setTasks([]);
        setCarta(null);
      }
    } else {
      alert("Debe completar todos los campos del formulario");
    }
  };
  return (
    <div id="tabla" className="w-full p-4">
      {showDrawerInforme && (
        <DrawerInforme
          useDisclosure={() => ({
            isOpen: showDrawerInforme,
            onClose: () => {
              setShowDrawerInforme(false);
              list.reload();
              toast.success("Informe enviado correctamente", {
                position: "top-right",
              });
            },
            onOpenChange: (isOpen) => setShowDrawerInforme(isOpen),
            selectSolicitud,
          })}
        />
      )}
      <Toaster />
      <div className="flex justify-between items-center">
        <Input
          id="filter-input"
          placeholder="Buscar por RUT o empresa..."
          startContent={<Search />}
          value={filterValue}
          onValueChange={onSearchChange}
          variant="bordered"
        />
      </div>
      <Table
        aria-label="Tabla de solicitudes con búsqueda y filtro"
        classNames={{
          table: "min-h-[100px] max-h-[93.5vh]",
          wrapper: "bg-[transparent]",
          th: "bg-[#656565] text-white font-bold  text-md",
          td: "text-md",
        }}
        shadow="none"
        isStriped
        color="primary"
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn
            style={{
              textAlign: "center",
              borderRightWidth: "0.2rem",
              borderColor: "white",
            }}
            key="idSolicitud"
          >
            ID SOLICITUD
          </TableColumn>
          <TableColumn
            style={{
              textAlign: "center",
              borderRightWidth: "0.2rem",
              borderColor: "white",
            }}
            key="nombre"
          >
            Nombre
          </TableColumn>
          <TableColumn
            style={{
              textAlign: "center",
              borderRightWidth: "0.2rem",
              borderColor: "white",
            }}
            key="rut"
          >
            RUT
          </TableColumn>
          <TableColumn
            style={{
              textAlign: "center",
              borderRightWidth: "0.2rem",
              borderColor: "white",
            }}
            key="rutEmpresa"
          >
            RUT EMPRESA
          </TableColumn>
          <TableColumn
            style={{
              textAlign: "center",
              borderRightWidth: "0.2rem",
              borderColor: "white",
            }}
            key="fechaSolicitud"
          >
            FECHA SOLICITUD
          </TableColumn>
          <TableColumn
            style={{
              textAlign: "center",
              borderRightWidth: "0.2rem",
              borderColor: "white",
            }}
            key="fase"
          >
            ESTADO
          </TableColumn>
        </TableHeader>
        <TableBody
          items={filteredItems}
          isLoading={isLoading}
          loadingContent={<Spinner label="Cargando solicitudes..." />}
        >
          {(item: Solicitud) => (
            <TableRow
              key={item.idSolicitud}
              onClick={() => handleRowClick(item)} // Hacer clic en la fila
              style={{ cursor: "pointer" }}
            >
              <TableCell style={{ textAlign: "center" }}>
                {item.idSolicitud}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {item.nombre}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>{item.rut}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {item.rutEmpresa}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {new Date(item.fechaSolicitud).toLocaleDateString()}
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                }}
              >
                {item.fase === 4 &&
                !item.supervisorCheck &&
                !item.alumnoCheck ? (
                  <Chip
                    startContent={<CircleAlert size={18} />}
                    color="warning"
                    variant="flat"
                  >
                    Requiere Formulario
                  </Chip>
                ) : item.fase === 4 &&
                  item.supervisorCheck &&
                  !item.alumnoCheck ? (
                  <Chip
                    startContent={<Spinner size="sm" color="secondary" />}
                    color="secondary"
                    variant="flat"
                  >
                    Pendiente firma del alumno
                  </Chip>
                ) : item.fase === 5 ? (
                  <Chip
                    startContent={<Spinner color="warning" size="sm" />}
                    color="default"
                    variant="flat"
                  >
                    Pendiente de validación (Coordinación)
                  </Chip>
                ) : item.fase === 6 ? (
                  <Chip
                    startContent={<ContactRound size={18} />}
                    color="primary"
                    variant="flat"
                  >
                    Practica iniciada
                  </Chip>
                ) : item.fase === 7 && !item.informe ? (
                  <Chip
                    startContent={<CircleAlert size={18} />}
                    color="danger"
                    variant="flat"
                  >
                    Requiere Evaluacion
                  </Chip>
                ) : item.fase === 7 && item.informe ? (
                  <Chip
                    startContent={<Spinner color="success" size="sm" />}
                    color="default"
                    variant="flat"
                  >
                    Pendiente de evaluación (Estudiante)
                  </Chip>
                ) : item.fase === 8 ? (
                  <Chip
                    startContent={<Spinner color="danger" size="sm" />}
                    color="default"
                    variant="flat"
                  >
                    Pendiente de evaluación (Coordinación)
                  </Chip>
                ) : item.fase === 9 ? (
                  <Chip
                    startContent={<BadgeCheck size={18} />}
                    color="success"
                    variant="flat"
                  >
                    Práctica finalizada
                  </Chip>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {showCardFormulario && (
        <Card
          ref={cardFormularioRef}
          id="card_formulario"
          className={`${styles.new_solicitud} ${isActive ? styles.active : ""}`}
        >
          <h1 className="text-3xl font-bold text-gray-800 pt-[2rem] pl-[2rem]">
            Formulario de carta de aceptación
          </h1>
          <h2 className="text-1xl text-gray-400 pl-[2rem]">
            En este espacio el supervisor debe llenar cada apartado para
            proceder con la firma de la carta de aceptación.
          </h2>
          <div
            className="grid grid-cols-2 pt-[2rem] p-[2rem] gap-[0.8rem] mb-[2rem]"
            style={{ gridTemplateColumns: "35% 65%" }}
          >
            <div className="flex flex-col gap-2 ">
              <Input
                variant="bordered"
                aria-label="idSolicitud"
                value={carta?.idSolicitud?.toString()}
                isDisabled
                placeholder="idSolicitud"
                label="idSolicitud"
                labelPlacement="inside"
                size="sm"
              />
              <Input
                variant="bordered"
                aria-label="Correo supervisor"
                label="Correo supervisor"
                labelPlacement="inside"
                size="sm"
                placeholder="Correo supervisor"
                isDisabled
                value={carta?.correoSupervisor}
              />
              <DateRangePicker
                className="max-w-xs"
                variant="bordered"
                size="md"
                label="Fecha Inicio/Fin"
                labelPlacement="inside"
                placeholder="Fecha Inicio/Fin"
                startContent={
                  <Tooltip content="Seleccione el rango de fechas, se debe seleccionar la celda correspondiente a cada fecha">
                    <HelpCircle size={30} color="gray" />
                  </Tooltip>
                }
                value={value || null}
                onChange={(value) => value && setValue(value)}
              />
              <div className="grid grid-rows-2 gap-2">
                <div className="flex flex-row gap-2 justify-start items-center">
                  <Checkbox
                    size="lg"
                    isSelected={carta?.supervisorCheck}
                    onValueChange={() => handleSubmitForum()}
                  >
                    Firmado del supervisor
                  </Checkbox>
                  <Tooltip content="Se habilita al completar el formulario">
                    <CircleHelp size={20} color="grey" />
                  </Tooltip>
                </div>
                <div className="flex flex-row gap-2 justify-start items-center">
                  <Checkbox
                    size="lg"
                    isSelected={carta?.alumnoCheck}
                    isDisabled
                  >
                    Firmado del alumno
                  </Checkbox>
                  <Tooltip
                    content={
                      carta?.supervisorCheck
                        ? "Al palomear aceptas los datos introducidos por el supervisor y darás comienzo a la práctica"
                        : "Se activará cuando el supervisor termine y firme el formulario"
                    }
                  >
                    <CircleHelp size={20} color="grey" />
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <TaskForm tasks={tasks} setTasks={setTasks} />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
