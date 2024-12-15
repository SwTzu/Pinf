"use client";
import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
  Spinner,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { backendUrl } from "@/config/config";
import { Mail, Search, CircleHelp } from "lucide-react";
import styles from "@/styles/est.module.css";
import { addSup } from "@/api/est/solicitudes";
interface Solicitud {
  idSolicitud: number;
  rut: string;
  rutEmpresa: string;
  fechaSolicitud: string;
  extension: string | null;
  numeroPractica: number;
  descripcionRechazo: string | null;
  fase: number;
  calificacion: number | null;
  correoSupervisor: string;
  notasCOO: string | null;
  createdAt: string;
  updatedAt: string;
}
interface carta {
  idSolicitud: number;
  correoSupervisor: string;
  tareas: string;
  fechaInicio: string;
  fechaTermino: string;
  supervisorCheck: boolean;
  alumnoCheck: boolean;
}
export default function TablaAcp({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState(""); // Valor de búsqueda
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showCardFormulario, setShowCardFormulario] = useState(false); // Para controlar la visibilidad de la card
  const cardFormularioRef = useRef<HTMLDivElement>(null); // Crear una referencia para el formulario
  const [isActive, setIsActive] = useState(false);
  const [carta, setCarta] = useState<carta | null>(null);
  const [email, setEmail] = useState("");
  const [idSolicitud, setIdSolicitud] = useState<number>(0);
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const redireccion = () => {
    cardFormularioRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  };
  let list = useAsyncList<Solicitud>({
    async load({ signal }) {
      let res = await fetch(`${backendUrl}/solicitud/listaSolicitudes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
        signal,
      });

      let json = await res.json();
      setIsLoading(false);
      return {
        items: json.solicitudes,
      };
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

    // Filtrar por fase entre 3 y 5
    filtered = filtered.filter((item) => item.fase >= 3 && item.fase <= 5);

    return filtered;
  }, [list.items, filterValue]);
  const handleRowClick = (item: Solicitud) => {
    if (item.fase === 3) {
      // Abrir el modal si la fase es 3
      setIdSolicitud(item.idSolicitud);
      onOpen();
    } else if (item.fase === 4) {
      // Mostrar la card de formulario si la fase es 4 y desplazar la vista hacia él
      setShowCardFormulario(true);
      redireccion();
      setTimeout(() => {
        cardFormularioRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Añadir un pequeño retraso para asegurar que el formulario está visible antes del scroll
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

  return (
    <>
      <div className="flex justify-between items-center mb-4 p-2 gap-4">
        <Input
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
          table: "min-h-[400px] max-h-[93.5vh]",
          wrapper: "bg-[transparent]",
          th: "bg-[#656565] text-white font-bold  text-md",
        }}
        shadow="none"
        isStriped
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
              style={{ cursor: "pointer" }} // Mostrar que la fila es clickeable
            >
              <TableCell style={{ textAlign: "center" }}>
                {item.idSolicitud}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>{item.rut}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {item.rutEmpresa}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {new Date(item.fechaSolicitud).toLocaleDateString()}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {item.fase === 4 ? "Formularios" : "Coordinacion"}
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
            En este apartado puede visualizar el contenido de la carta de
            aceptación que debe rellenar el supervisor de la empresa.
          </h2>
          <div className="grid grid-cols-2 pt-[2rem] pl-[2rem] gap-[0.8rem] mb-[2rem]">
            <Input
              variant="bordered"
              label="idSolicitud"
              isDisabled
              value={carta?.idSolicitud?.toString()}
            />
            <Input
              variant="bordered"
              label="Correo supervisor"
              isDisabled
              value={carta?.correoSupervisor}
            />
            <Input
              variant="bordered"
              label="tareas"
              isDisabled
              value={carta?.tareas}
            />
            <Input
              variant="bordered"
              label="Fecha inicio"
              isDisabled
              value={carta?.fechaInicio}
            />
            <Input
              variant="bordered"
              label="Fecha termino"
              isDisabled
              value={carta?.fechaTermino}
            />
            <div className="grid grid-rows-2 gap-2">
              <div className="flex flex-row gap-2 justify-start items-center">
                <Checkbox
                  size="lg"
                  isSelected={carta?.supervisorCheck}
                  isDisabled
                >
                  Firmado del supervisor
                </Checkbox>
                <Tooltip
                  content="Aqui se indica si el supervisor finalizo y firmo el formulario"
                >
                  <CircleHelp className="text-2xl text-green-900 flex-shrink-0" />
                </Tooltip>
              </div>
              <div className="flex flex-row gap-2 justify-start items-center">
                <Checkbox size="lg" isSelected={carta?.alumnoCheck} isDisabled>
                  Firmado del alumno
                </Checkbox>
                <Tooltip
                  content={
                  carta?.supervisorCheck
                    ? "Al palomear aceptas los datos introducidos por el supervisor y darás comienzo a la práctica"
                    : "Se activará cuando el supervisor termine y firme el formulario"
                  }
                >
                  <CircleHelp className="text-2xl text-green-900 flex-shrink-0" />
                </Tooltip>
              </div>
            </div>
          </div>
        </Card>
      )}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-[1rem] font-bold text-3xl text-center">
                Tu solicitud fue firmada
              </ModalHeader>
              <ModalBody>
                <p className="m-[1rem] text-justify ">
                  Es necesario ingresar el correo electronico del supervisor
                  asignado por la empresa para continuar con el proceso.
                </p>
                <Input
                  size="lg"
                  type="email"
                  placeholder="correo@supervisor.cl"
                  labelPlacement="outside"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!isEmailValid(email)}
                  startContent={
                    <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  className="p-[1rem]"
                />
                <p className="m-[1rem] text-justify text-sm text-gray-500">
                  Si cancela la operacion se perderan los datos ingresados pero
                  se mantendra la firma de la solicitud.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    addSup(token, idSolicitud, email);
                    onClose();
                    alert(
                      "Se ha enviado el mensaje de confirmacion al correo ingresado"
                    );
                  }}
                  isDisabled={!isEmailValid(email)}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
