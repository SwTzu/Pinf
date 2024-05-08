import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination,
  Button,
} from "@nextui-org/react";
import styles from "../../styles/styleop.module.css";
const statusColorMap = {
  Pendiente: "warning",
  Aprobado: "success",
  Rechazado: "danger",
};

export default function Listar({ columns, data, Modificaciones, Aprobar, Rechazar, Pendiente, Guardar}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [selectedRows, setSelectedRows] = useState([]);
  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const handleAction = (action, item) => {
    const itemId = item.id;

    // Guardar el ID de la fila afectada
    setSelectedRows((prevSelectedRows) => {
      if (!prevSelectedRows.includes(itemId)) {
        return [...prevSelectedRows, itemId];
      }
      return prevSelectedRows;
    });

    switch (action) {
      case "aprobar":
        // Lógica para aprobar (puedes cambiar el estado del elemento aquí)
        Aprobar(itemId, "Aprobado");
        break;
      case "rechazar":
        // Lógica para rechazar (puedes cambiar el estado del elemento aquí)
        Rechazar(itemId, "Rechazado");
        break;
      case "pendiente":
        // Lógica para pendiente (puedes cambiar el estado del elemento aquí)
        Pendiente(itemId, "Pendiente");
        break;
      default:
        break;
    }
  };

  const getRowColor = (status) => {
    return statusColorMap[status] || "default";
  };

  return (
    <div className={styles.bloquetable} id="boxasd">
      <Table
        id="table"
        selectionMode="single"
        aria-label="Tabla de datos"
        className={styles.styltable}
        bottomContent={
          <div className={styles.pagination} id='paginacion'>
            <Pagination
              isCompact
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
            <Button onClick={Guardar}>Guardar</Button>
          </div>
        }
      >
        <TableHeader>
          {Object.keys(columns).map((column) => (
            <TableColumn key={column} className={styles.tableheader}>
              {columns[column]}
            </TableColumn>
          ))}
          <TableColumn key="actions" className={styles.tableheader}>
            Acciones
          </TableColumn>
        </TableHeader>
        <TableBody items={items} className={styles.tablebody} id="tableBodY">
          {(item) => (
            <TableRow
              key={item.id}
              className={styles.tablerow}
              color={getRowColor(item.estado)}
            >
              {Object.keys(columns).map((column) => (
                <TableCell key={column} className={styles.cell}>
                  {column === "fecha"
                    ? item[column].split("T")[0]
                    : column === "estado"
                    ? (
                      <Chip
                        className="capitalize"
                        color={statusColorMap[Modificaciones[item.id]]}
                        size="sm"
                        variant="flat"
                      >
                        {Modificaciones[item.id]}
                      </Chip>
                    )
                    : item[column]}
                </TableCell>
              ))}
              <TableCell className={styles.cell}>
                <div className="relative flex items-center gap-2" id="tablecell">
                  <Tooltip content="pendiente">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      id="spanCell"
                      onClick={() => handleAction("pendiente", item)}
                    >
                      S
                    </span>
                  </Tooltip>
                  <Tooltip content="Aprobar">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      id="spanCell"
                      onClick={() => handleAction("aprobar", item)}
                    >
                      A
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Rechazar">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      id="spanCell"
                      onClick={() => handleAction("rechazar", item)}
                    >
                      R
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
