import React, {
  useState,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
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
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { backendUrl } from "@/config/config";
import {
  Trash2,
  FileText,
  EllipsisVertical,
  Search,
  ChevronDown,
  BadgeCheck,
  CircleX,
  Plus,
  FileQuestion,
  UserCheck,
  MonitorCog,
  FileUp,
  CircleCheck,
} from "lucide-react";
import { deleteSolicitud, PDF, uploadMemoria} from "@/api/est/solicitudes";
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
  memoria: boolean | null;
  createdAt: string;
  updatedAt: string;
}
const TablaSolicitudes = forwardRef(({ token }: { token: string }, ref) => {
  TablaSolicitudes.displayName = "TablaSolicitudes";
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState(""); // Valor de búsqueda
  const [statusFilter, setStatusFilter] = useState("all"); // Filtro de fase
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
  useImperativeHandle(ref, () => ({
    reload: list.reload,
  }));
  const filteredItems = useMemo(() => {
    let filtered = list.items;

    if (filterValue) {
      filtered = filtered.filter(
        (item) =>
          item.idSolicitud.toString().includes(filterValue) || // Check against idSolicitud
          item.rut.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.rutEmpresa.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.fase === parseInt(statusFilter)
      );
    }

    return filtered;
  }, [list.items, filterValue, statusFilter]);

  const Delete = async (idSolicitud: any) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta solicitud?"
    );
    if (confirmDelete) {
      await deleteSolicitud({ idSolicitud: idSolicitud, token: token });
    }
    list.reload();
  };
  const renderActions = (item: Solicitud) => {
    return (
      <div className="relative flex justify-center items-center">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="lg" variant="light" onPress={() => {}}>
              <EllipsisVertical />
            </Button>
          </DropdownTrigger>
            <DropdownMenu
            style={{ width: "100%", textAlign: "center" }}
            disabledKeys={
              (item.fase !== 3 ? ["PDF"] : []).concat(item.fase !== 7 ? ["Memoria"] : [])
            }
            >
            <DropdownItem
              key={"PDF"}
              startContent={<FileText />}
              onPress={() => {
              PDF(token, item.rutEmpresa, item.numeroPractica);
              }}
            >
              PDF
            </DropdownItem>
            <DropdownItem
              key={"Memoria"}
              startContent={<FileUp />}
              onPress={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".pdf";
                input.onchange = async (event) => {
                  const file = (event.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const confirmUpload = window.confirm(
                      "¿Estás seguro de que deseas subir este documento?"
                    );
                    if (confirmUpload) {
                      await uploadMemoria(token,item.idSolicitud,file).then((res) => {
                        if (res) {
                          list.reload();
                          alert("Memoria subida correctamente");
                          
                        } else {
                          alert("Error al subir la memoria");
                        }
                      }
                      );
                    }
                    list.reload();
                  }
                };
                input.click();
              }}
            >
              Subir Memoria
            </DropdownItem>
            <DropdownItem
              key={"Delete"}
              startContent={<Trash2 />}
              color="danger"
              onPress={() => {
              Delete(item.idSolicitud);
              }}
            >
              Delete
            </DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </div>
    );
  };
  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value);
  }, []);
  const onStatusFilterChange = useCallback((keys: any) => {
    setStatusFilter(keys.values().next().value as string);
  }, []);
  return (
    <>
      <div className="flex justify-between items-center mb-4 p-2 gap-4">
        <Input
          placeholder="Buscar por ID de solicitud o RUT de empresa..."
          startContent={<Search />}
          value={filterValue}
          onValueChange={onSearchChange}
          variant="bordered"
        />
        <Dropdown>
          <DropdownTrigger>
            <Button endContent={<ChevronDown />} onPress={()=>{}}>Fase</Button>
          </DropdownTrigger>
            <DropdownMenu
            aria-label="Filtrar por fase"
            selectionMode="single"
            selectedKeys={new Set([statusFilter])}
            onSelectionChange={onStatusFilterChange}
            >
            <DropdownItem key="all">Todas</DropdownItem>
            <DropdownItem key="0">Rechazada</DropdownItem>
            <DropdownItem key="1">Solicitado</DropdownItem>
            <DropdownItem key="2">Revisado</DropdownItem>
            <DropdownItem key="3">Ingresar Supervisor</DropdownItem>
            <DropdownItem key="4">Carta de Aceptación</DropdownItem>
            <DropdownItem key="5">Revision de Coordinación</DropdownItem>
            <DropdownItem key="6">Practica Iniciada</DropdownItem>
            <DropdownItem key="7">Requiere Memoria</DropdownItem>
            <DropdownItem key="8">Evaluacion de Coordinación</DropdownItem>
            <DropdownItem key="9">Finalizada</DropdownItem>
            </DropdownMenu>
        </Dropdown>
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
                {item.fase === 0
                  ? <Chip
                  startContent={<CircleX size={18} />}
                  color="danger"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Rechazada
                </Chip>
                  : item.fase === 1
                  ? <Tooltip content="Solicitud enviada al Administrador">
                    <Chip
                  startContent={<FileQuestion size={18}/>}
                  color="default"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Solicitado
                </Chip>
                  </Tooltip>
                  : item.fase === 2
                  ? <Tooltip content="Solicitud enviada al Jefe de carrera"><Chip
                  startContent={<UserCheck size={18}/>}
                  color="default"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Revisado
                </Chip>
                </Tooltip>
                  : item.fase === 3
                  ? <><Tooltip color="success" content="Se habilito la Carta de presentacion (Acciones)"><Chip
                  color="success"
                  variant="flat"
                  className="p-2"
                  size='md'
                ><CircleCheck size={18}/>
                </Chip></Tooltip><Tooltip color="warning" content="Se requiere ingresar Email de Supervisor (Carta de aceptación)"><Chip
                  startContent={<Plus size={18}/>}
                  color="warning"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Ingresar Supervisor
                </Chip></Tooltip></>
                  : item.fase === 4
                  ? <Tooltip color="warning" content="El Supervisor debe llenar la carta de aceptación para continuar"><Chip
                  startContent={<Spinner size="sm" color="secondary" />}
                  color="warning"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Carta de Aceptación
                </Chip></Tooltip>
                  : item.fase === 5
                  ? <Tooltip color="primary" content="El Coordinador debe aprobar la carta de aceptación para continuar"><Chip
                  startContent={<Spinner size="sm" color="secondary" />}
                  color="primary"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Revision de Coordinación
                </Chip></Tooltip>
                  : item.fase === 6
                  ? <Chip
                  startContent={<MonitorCog size={18}/>}
                  color="primary"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Practica Iniciada
                </Chip>
                  : item.fase === 7 && !item.memoria
                  ? <Tooltip color="warning" content="Se debe ingresar la Memoria correspondiente para continuar"><Chip
                  startContent={<Plus size={18}/>}
                  color="warning"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Requiere Memoria
                </Chip></Tooltip>
                : item.fase === 7 && item.memoria
                ? <Tooltip color="warning" content="Hace falta la evaluacion del Supervisor"><Chip
                startContent={<Spinner size="sm" color="success" />}
                color="warning"
                variant="flat"
                className="p-2"
                size='md'
              >
                Evaluacion de Supervisor
              </Chip></Tooltip>
                  : item.fase === 8
                  ? <Tooltip color="primary" content="El Coordinador esta revisando la documentación"><Chip
                  startContent={<Spinner size="sm" color="secondary" />}
                  color="primary"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Evaluacion de Coordinación
                </Chip></Tooltip>
                  : item.fase === 9
                  ? <Chip
                  startContent={<BadgeCheck size={18} />}
                  color="success"
                  variant="flat"
                  className="p-2"
                  size='md'
                >
                  Finalizada
                </Chip>
                  : ""}
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
});
export default TablaSolicitudes;
