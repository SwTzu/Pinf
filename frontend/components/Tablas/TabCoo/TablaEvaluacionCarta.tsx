"use client";
import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Spinner,
  Card,
  Chip,
  Accordion,
  AccordionItem,
  Divider,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  Tooltip,
  useDisclosure,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { backendUrl } from "@/config/config";
import {
  Search,
  Asterisk,
  FileSearch,
  CircleX,
  Send,
  Save,
} from "lucide-react";
import styles from "@/styles/est.module.css";
import { obtenerCarta } from "@/api/est/solicitudes";
import { updateFase, getInforme, dowload } from "@/api/coo/solicitudes";
import toast, { Toaster } from "react-hot-toast";
import ContentModal from "./ContentModal";
import { Solicitud, Task, carta, area} from "@/types/interfaces";
export default function TablaEvaluacionCarta({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState(""); // Valor de búsqueda
  const [showCardFormulario, setShowCardFormulario] = useState(false); // Para controlar la visibilidad de la card
  const cardFormularioRef = useRef<HTMLDivElement>(null); // Crear una referencia para el formulario
  const [isActive, setIsActive] = useState(false);
  const [carta, setCarta] = useState<carta | null>(null);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
    onClose: onModalClose,
  } = useDisclosure();
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
  const redireccion = () => {
    cardFormularioRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  };
  let list = useAsyncList<Solicitud>({
    async load({ signal }) {
      let res = await fetch(`${backendUrl}/solicitud/allSolicitudesCoo`, {
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
    filtered = filtered.filter((item) => item.fase >= 3 && item.fase < 9);

    return filtered;
  }, [list.items, filterValue]);
  const handleRowClick = (item: Solicitud) => {
    console.log(item);
    if (item.fase === 5) {
      obtenerCarta(item.idSolicitud).then((res) => {
        // Convertir la fecha de YYYY-MM-DD a DD-MM-YYYY
        const formatFecha = (fecha: string) => {
          const [year, month, day] = fecha.split("-");
          return `${day}-${month}-${year}`;
        };

        res.fechaInicio = formatFecha(res.fechaInicio.split("T")[0]);
        res.fechaTermino = formatFecha(res.fechaTermino.split("T")[0]);
        res.supervisorCheck = true;
        setCarta(res);
      });
      setShowCardFormulario(true);
      redireccion();
      setTimeout(() => {
        cardFormularioRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Añadir un pequeño retraso para asegurar que el formulario está visible antes del scroll
    } else if (item.fase === 8) {
      {
        getInforme(item.idSolicitud).then((res) => {
          if (res.informe != undefined) {
            setInforme(res.informe.formulario);
            setInforme((prevInforme) => ({
              ...prevInforme,
              nota: res.informe.nota,
              idSolicitud: item.idSolicitud,
            }));
            onModalOpen();
          } else {
            toast.error("Error al obtener el informe");
          }
        });
      }
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
  const handleRechazo = (onClose: () => void) => {
    updateFase(token, carta?.idSolicitud, 0, motivoRechazo).then((res) => {
      if (res) {
        toast.success("Carta rechazada correctamente");
        setShowCardFormulario(false);
        setMotivoRechazo("");
        onClose();
        list.reload();
      } else {
        toast.error("Error al rechazar la carta");
      }
    });
  };
  return (
    <>
      <Toaster />
      <Modal
        backdrop="opaque"
        isOpen={isModalOpen}
        onClose={onModalClose}
        onOpenChange={onModalOpenChange}
        scrollBehavior="inside"
        size="3xl"
        classNames={{
          base: styles.customScroll,
        }}
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
                <Tooltip content="Descargar Memoria del estudiante">
                  <Button
                    color="success"
                    onPress={() => {
                      dowload(informe.idSolicitud)
                        .then(() => {
                          toast.success("Memoria descargada correctamente");
                        })
                        .catch(() => {
                          toast.error("Error al descargar la memoria");
                        });
                    }}
                    variant="flat"
                    size="md"
                    startContent={<Save size={18} />}
                  >
                    Memoria
                  </Button>
                </Tooltip>
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 p-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-black-500"
                    size="sm"
                    variant="light"
                    onPress={onClose}
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
                      onClose();
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
                  onPress={() => handleRechazo(onClose)}
                  className="w-full"
                  variant="flat"
                  startContent={<Send />}
                >
                  Rechazar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
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
          table: "max-h-[93.5vh]",
          wrapper: "bg-[transparent]",
          th: "bg-[#656565] text-white font-bold  text-md",
          td: "text-md",
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
                {item.fase === 5 ? (
                  <Chip
                    size="md"
                    color="danger"
                    className="p-2"
                    startContent={<FileSearch color="white" size={16} />}
                  >
                    Revisar Carta
                  </Chip>
                ) : (
                  <Chip
                    className="p-2"
                    color="success"
                    size="md"
                    startContent={<FileSearch color="black" size={18} />}
                  >
                    Revisar Informe & Memoria
                  </Chip>
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
            En este apartado puede visualizar el contenido de la carta de
            aceptación que debe rellenar el supervisor de la empresa.
          </h2>
          <Divider />
          <div className="flex justify-between items-center px-[2rem] pt-[1rem] gap-4 text-gray-500">
            <h1 className="w-1/2 text-center">Datos de Carta</h1>
            <h1 className="w-1/2 text-center">Tareas</h1>
          </div>
          <div className="grid grid-cols-2 px-[2rem] pt-[1rem] gap-[0.8rem] mb-[2rem]">
            <div className="grid grid-cols-1 gap-2">
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
                  <Button
                    color="success"
                    className="w-2/3"
                    onPress={() => {
                      updateFase(
                        token,
                        carta?.idSolicitud,
                        6,
                        motivoRechazo
                      ).then((res) => {
                        if (res) {
                          alert("Carta aceptada correctamente");
                          setShowCardFormulario(false);
                          list.reload();
                        } else {
                          alert("Error al aceptar la carta");
                        }
                      });
                    }}
                    variant="flat"
                  >
                    Aceptar
                  </Button>
                  <Button
                    color="danger"
                    onPress={() => {
                      onOpen();
                    }}
                    className="w-1/3"
                    variant="flat"
                  >
                    Rechazar
                  </Button>
                </div>
              </div>
            </div>
            <Accordion variant="splitted" aria-label="Tareas de la carta">
              {carta?.tareas?.map((tarea: Task, index) => (
                <AccordionItem
                  key={index}
                  aria-label={tarea.name}
                  title={tarea.name}
                  startContent={<Asterisk color="gray" />}
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
        </Card>
      )}
    </>
  );
}
