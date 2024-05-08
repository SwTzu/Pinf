'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button } from "@nextui-org/react";
import styles from '../../styles/styleop.module.css';

export default function Listar({ columns, data }) {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 9;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <div className={styles.bloquetable} id='boxasd'>
      <Table
        aria-label='Tabla de datos'
        className={styles.styltable}
        bottomContent={
        <div className="flex w-full justify-center" id="pagineishon">
            <Pagination
              isCompact
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader id="Head1">
          {Object.keys(columns).map((column) => (
            <TableColumn key={column} className={styles.tableheader} id="Colums1">{columns[column]}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={items} className={styles.tablebody} id='tableBodY'>
          {(item) => (
            <TableRow key={Object.values(item).join('-')} className={styles.tablerow} id="Rows$%">
              {Object.keys(columns).map((column) => (
                <TableCell key={column} className={styles.cell}>
                {column === 'fecha' ? item[column].split('T')[0] : item[column]}
              </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
