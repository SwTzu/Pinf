import React, { useState, useMemo, useCallback } from "react";
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
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { backendUrl } from "@/config/config";
import { Trash2, Eye, Pencil, EllipsisVertical, Search, ChevronDown } from "lucide-react";

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

export default function TablaSolicitudes({ token }: { token: string }) {
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
      filtered = filtered.filter((item) => item.fase === parseInt(statusFilter));
    }

    return filtered;
  }, [list.items, filterValue, statusFilter]);

  const renderActions = (item: Solicitud) => {
    return (
      <div className="relative flex justify-center items-center">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="lg" variant="light">
              <EllipsisVertical />
            </Button>
          </DropdownTrigger>
          <DropdownMenu style={{ width: "100%", textAlign: "center" }}>
            <DropdownItem startContent={<Eye />}>View</DropdownItem>
            <DropdownItem startContent={<Pencil />}>Edit</DropdownItem>
            <DropdownItem startContent={<Trash2 />} color="danger">
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
            <Button endContent={<ChevronDown />}>Fase</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filtrar por fase"
            selectionMode="single"
            selectedKeys={new Set([statusFilter])}
            onSelectionChange={onStatusFilterChange}
          >
            <DropdownItem key="all">Todas</DropdownItem>
            <DropdownItem key="0">Rechazado</DropdownItem>
            <DropdownItem key="1">Solicitado</DropdownItem>
            <DropdownItem key="2">Revisado</DropdownItem>
            <DropdownItem key="3">Firmado</DropdownItem>
            <DropdownItem key="4">Formularios</DropdownItem>
            <DropdownItem key="5">Coordinacion</DropdownItem>
            <DropdownItem key="6">Iniciada</DropdownItem>
            <DropdownItem key="7">Memoria</DropdownItem>
            <DropdownItem key="8">Revision evaluacion</DropdownItem>
            <DropdownItem key="9">Finalizado</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
                  ? "Rechazado"
                  : item.fase === 1
                  ? "Solicitado"
                  : item.fase === 2
                  ? "Revisado"
                  : item.fase === 3
                  ? "Firmado"
                  : item.fase === 4
                  ? "Formularios"
                  : item.fase === 5
                  ? "Coordinacion"
                  : item.fase === 6
                  ? "Iniciada"
                  : item.fase === 7
                  ? "Memoria"
                  : item.fase === 8
                  ? "Revision evaluacion"
                  : item.fase === 9
                  ? "Finalizado"
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
}
