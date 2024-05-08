import React, { useState, useEffect } from "react";
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
  Pagination,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { capitalize } from "./utils";
import {actualizarFaseSolicitud} from "../../../api/adm/solicitudes"
export default function TAB({
  columns,
  statusOptions,
  INITIAL_VISIBLE_COLUMNS,
  FASE,
  FuncionDatos
}) {
  const [datos, setData] = useState([]);
  const fetchData = async () => {
    try {
      const rawData = await FuncionDatos();
      const transformedData = rawData.map((item) => ({
        idSolicitud: item.idSolicitud,
        rut: item.rut,
        rutEmpresa: item.rutEmpresa,
        fechaSolicitud: item.fechaSolicitud,
        numeroPractica: item.numeroPractica,
        fase: item.fase,
      }));
      setData(transformedData);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }
  ,[]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "fase",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(datos.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") {
      return columns;
    }
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  const filteredItems = React.useMemo(() => {
    let filtereddatos = [...datos];

    if (hasSearchFilter) {
      filtereddatos = filtereddatos.filter((user) =>
        user.rut.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filtereddatos = filtereddatos.filter((user) =>
        user.rut.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtereddatos;
  }, [datos, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const pendientes = [];
  const renderCell = React.useCallback((user, columnKey,datos, setData) => {
    const cellValue = user[columnKey];
    const handleCellClick = () => {
      const tempInput = document.createElement('input');
      tempInput.value = cellValue;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    };
    const handleDropdownSelect = (selectedOption, idSolicitud, datos, setData) => {
      switch (selectedOption) {
        case "Pendiente":
          pendientes.push(idSolicitud);
          console.log(pendientes);
          break;
        case "Aceptar":
          console.log("idSolicitud", idSolicitud);
          actualizarFaseSolicitud(idSolicitud, FASE+1);
          setData(prevData => {
            const index = prevData.findIndex((item) => item.idSolicitud === idSolicitud);
            const newData = [...prevData.slice(0, index), ...prevData.slice(index + 1)];
            return newData;
          });
          break;
        case "Rechazar": // cambiar el color
          const rechazo = prompt("Por favor, ingresa la razón del rechazo:");
          if (rechazo) {
            actualizarFaseSolicitud(idSolicitud, 7, rechazo);
            setData(prevData => {
              const index = prevData.findIndex((item) => item.idSolicitud === idSolicitud);
              const newData = [...prevData.slice(0, index), ...prevData.slice(index + 1)];
              return newData;
            });
          }
          break;
        default:
          break;
      }
    };
    switch (columnKey) {
      case "idSolicitud":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.idSolicitud}</p>;
      case "rut":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.rut}</p>;
      case "rutEmpresa":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.rutEmpresa}</p>;
      case "fechaSolicitud":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.fechaSolicitud}</p>;
      case "numeroPractica":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.numeroPractica}</p>;
      case "acciones":
        return (
          <div id='action-cell' className="relative flex justify-end items-center gap-2 ">
            <Dropdown className="border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="opciones">
                <DropdownItem aria-label ="opcion aceptar" onClick={() => handleDropdownSelect("Aceptar", user.idSolicitud, datos,setData)}>Aceptar</DropdownItem>
                <DropdownItem aria-label ="opcion pendiente" onClick={() => handleDropdownSelect("Pendiente", user.idSolicitud, datos,setData)}>Pendiente</DropdownItem>
                <DropdownItem aria-label ="opcion rechazar"onClick={() => handleDropdownSelect("Rechazar",user.idSolicitud, datos,setData)}>Rechazar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);
  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Buscar Rut ..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="l"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    datos.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center mt-auto">
        <Pagination
          showControls
          color="secondary"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          isCompact
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      base: [
        "w-full",
        "h-full",
        "overflow-hidden",
        "bg-white",
        "border-3 rounded-lg",
        "text-black",
        "padding-[10px]",
        "gap-10",
      ],
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-black", "text-white", "border-b", "border-divider", "text-center", "text-md"],
      td: [
        "group-data-[first=true]:first:before:rounded-none border border-black ", // añade borde negro
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Tabla"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "acciones" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No datos found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.idSolicitud}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey, datos, setData)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
