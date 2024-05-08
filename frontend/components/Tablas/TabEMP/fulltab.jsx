import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
export default function TAB_EMP({
  columns,
  datos,
  INITIAL_VISIBLE_COLUMNS,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
        user.rutEmpresa.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filtereddatos = filtereddatos.filter((user) =>
        user.rutEmpresa.toLowerCase().includes(filterValue.toLowerCase())
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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    
    const handleCellClick = () => {
      // Lógica para cuando se hace click en una celda
    };
    switch (columnKey) {
      case "rutEmpresa":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.rutEmpresa}</p>;
      case "razonSocial":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.razonSocial}</p>;
      case "region":
        return <p onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '20px' }}> {user.region}</p>;
      default:
        return cellValue;
    }
  }, []);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="px-2 flex justify-between items-center mt-auto">
        Empresas Registradas
        <Pagination
          showControls
          color="secondary"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
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
        // ...otras clases para las celdas
        "group-data-[first=true]:first:before:rounded-none border border-black ", // añade borde negro a la primera celda
        "group-data-[first=true]:last:before:rounded-none border border-black", // añade borde negro a la última celda de la primera fila
        "group-data-[middle=true]:before:rounded-none border border-black ", // añade borde negro a las celdas del medio
        "group-data-[last=true]:first:before:rounded-none border border-black", // añade borde negro a la primera celda de la última fila
        "group-data-[last=true]:last:before:rounded-none border border-black", // añade borde negro a la última celda
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
          <TableRow key={item.rutEmpresa}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}