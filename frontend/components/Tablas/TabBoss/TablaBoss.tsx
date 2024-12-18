import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { UserCheck, UserX , EllipsisVertical, Search,Copy} from "lucide-react";
import { backendUrl } from "@/config/config";
import toast, { Toaster } from 'react-hot-toast';
interface Solicitud {
  idSolicitud: number;
  rut: string;
  rutEmpresa: string;
  fechaSolicitud: string;
  extension: string | null;
  numeroPractica: number;
  descripcionRechazo: string | null;
  fase: number;
  supervisorCheck: boolean;
  alumnoCheck: boolean;
  calificacion: number | null;
  correoSupervisor: string;
  notasCOO: string | null;
  createdAt: string;
  updatedAt: string;
}

const actualizarFaseSolicitud = async (
  Token:string,
  idSolicitud: number,
  nroFase: number,
  motivoRechazo: string
) => {
  try {
    const response = await fetch(
      `${backendUrl}/solicitud/actualizar/${idSolicitud}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({Token,idSolicitud, nroFase, motivoRechazo }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la fase de la solicitud");
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error al actualizar la fase", error);
    alert("Error al actualizar. Intente de nuevo más tarde.");
  }
};
export default function TablaBoss() {
  const Token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState(""); // Valor de búsqueda
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [items, setItems] = useState<Solicitud[]>([]);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [selectedSolicitudId, setSelectedSolicitudId] = useState<number | null>(null);
  const loadSolicitudes = async () => {
    try {
      let res = await fetch(`${backendUrl}/solicitud/allSolicitudesJefe`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let json = await res.json();
      setItems(json.solicitudes);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar las solicitudes", error);
      setIsLoading(false);
    }
  };
  
  // Usar un intervalo para actualizar la tabla automáticamente cada 10 segundos
  useEffect(() => {
    loadSolicitudes(); // Cargar solicitudes al montar el componente

    const intervalId = setInterval(() => {
      loadSolicitudes(); // Actualizar solicitudes cada 10 segundos
    }, 3000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filtrar por idSolicitud, RUT o empresa según el valor de búsqueda
    if (filterValue) {
      filtered = filtered.filter(
        (item) =>
          item.idSolicitud.toString().includes(filterValue) || // Filtrar por idSolicitud
          item.rut.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.rutEmpresa.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filtered;
  }, [items, filterValue]);
  const renderActions = (item: Solicitud) => {
    return (
      <div className="relative flex justify-center items-center">
        <Toaster />
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="lg" variant="light">
              <EllipsisVertical/>
            </Button>
          </DropdownTrigger>
          <DropdownMenu style={{ width: "100%", textAlign: "center" }}>
            <DropdownItem
              key="accept"
              startContent={<UserCheck />}
              color="success"
              onPress={() => actualizarFaseSolicitud(Token,item.idSolicitud, 3, '')}
            >
              Aceptar
            </DropdownItem>
            <DropdownItem
              key="reject"
              onPress={()=>{setSelectedSolicitudId(item.idSolicitud);onOpen()}}
              startContent={<UserX />}
              color="danger"
            >
              Rechazar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  async function handleCellClick(content: string) {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(content);
        //toast('Texto copiado');
        /* Resuelto - texto copiado al portapapeles con éxito */
      } else {
        fallbackCopyTextToClipboard(content);
        console.error('Clipboard API no está disponible');
        /* Rechazado - Clipboard API no está disponible */
      }
    } catch (err) {
      console.error('Error al copiar: ', err);
      fallbackCopyTextToClipboard(content);
      /* Rechazado - fallo al copiar el texto al portapapeles */
    }
  }

  function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      toast('Texto copiado',{
        duration: 2000,
        position: 'top-right',
      
        // Styling
        style: {backgroundColor: '#DDDCFB', color: 'black'},
      
        // Custom Icon
        icon: '📑',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (err) {
      console.error('Fallback: Error al copiar', err);
    }
    document.body.removeChild(textArea);
  }
  const handleGuardarRechazo = async () => {
    if (selectedSolicitudId !== null) {
      await actualizarFaseSolicitud(Token,selectedSolicitudId, 0, motivoRechazo); // Actualizar fase a 0 con motivo de rechazo
      setMotivoRechazo(""); // Limpiar motivo
      onOpenChange(); // Cerrar modal
    }
  };
  return (
    <>
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
                Solicitud rechazada
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center">
                <p className="m-[1rem] text-justify ">
                  Es necesario ingresar el motivo del rechazo de la solicitud.
                </p>
                <Textarea
                  label="Motivo de rechazo"
                  variant="bordered"
                  placeholder="Por que se rechaza la solicitud..."
                  disableAnimation
                  disableAutosize
                  classNames={{
                    base: "max-w-xs",
                    input: "resize-y min-h-[40px]",
                  }}
                  value={motivoRechazo}
                  onValueChange={setMotivoRechazo}
                />
                <p className="m-[1rem] text-justify text-sm text-gray-500">
                  Si cancela la operacion se perdera el comentario ingresados.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={()=>{setMotivoRechazo('');onClose()}}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleGuardarRechazo}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex justify-between items-center mb-4 p-2 gap-4">
        <Input
          placeholder="Buscar por ID de solicitud, RUT o empresa..."
          startContent={<Search />}
          value={filterValue}
          onValueChange={onSearchChange}
          variant="bordered"
        />
      </div>
      <Table
        aria-label="Tabla de solicitudes con búsqueda"
        classNames={{
          table: "min-h-[00px] max-h-[93.5vh]",
          wrapper: "bg-[transparent]",
          th: "bg-[#656565] text-white font-bold text-md",
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
          <TableColumn
            style={{ width: "7rem", textAlign: "center" }}
            key="actions"
          >
            ACCIONES
          </TableColumn>
        </TableHeader>
        <TableBody
          items={filteredItems}
          isLoading={isLoading}
          loadingContent={<Spinner label="Cargando solicitudes..." />}
          emptyContent={
            <div className="text-center p-4">
              <p className="text-gray-500 font-bold">
                No hay solicitudes disponibles para mostrar.
              </p>
            </div>
          }
        >
          {(item: Solicitud) => (
            <TableRow key={item.idSolicitud}>
              <TableCell
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => handleCellClick(item.idSolicitud.toString())}
              >
                <Tooltip
                  delay={200}
                  color="default"
                  content={<Copy color={'gray'}/>}
                >
                  {item.idSolicitud}
                </Tooltip>
              </TableCell>
              <TableCell
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => handleCellClick(item.rut)}
              >
                <Tooltip
                  delay={200}
                  color="default"
                  content={<Copy color={'gray'}/>}
                >
                  {item.rut}
                </Tooltip>
              </TableCell>
              <TableCell
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => handleCellClick(item.rutEmpresa)}
              >
                <Tooltip
                  delay={200}
                  color="default"
                  content={<Copy color={'gray'}/>}
                >
                  {item.rutEmpresa}
                </Tooltip>
              </TableCell>
              <TableCell style={{ textAlign: "center", cursor: "pointer" }}>
                {new Date(item.fechaSolicitud).toLocaleDateString()}
              </TableCell>
              <TableCell style={{ textAlign: "center", cursor: "pointer" }}>
                {item.fase === 2 ? "Revisado" : ""}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {renderActions(item)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
