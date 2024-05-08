"use client";
import React, { useState, useEffect } from "react";
import { Button, Image } from "@nextui-org/react";
import styles from "../../styles/styleop.module.css";
import NextLink from "next/link";
import { AllSoli } from "../../api/sup/solicitudes";
import TAB from "../../components/Tablas/TabSUP/fulltab";
export default function Sup() {
  const [data, setData] = useState([]);
  const Token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await AllSoli(Token);
        const transformedData = rawData.map((item) => ({
          idSolicitud: item.idSolicitud,
          rut: item.rut,
          rutEmpresa: item.rutEmpresa,
          fechaSolicitud: item.fechaSolicitud,
          numeroPractica: item.numeroPractica,
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  const statusOptions = [
    { name: "Presentacion", uid: "1" },
    { name: "Aceptacion", uid: "2" },
  ];
  const columns = [
    { name: "RUT Estudiante", uid: "rut", sortable: true },
    { name: "Fecha", uid: "fechaSolicitud", sortable: true },
    { name: "Estado", uid: "fase", sortable: false },
    { name: "Acciones", uid: "acciones", sortable: false },
  ];
  const INITIAL_VISIBLE_COLUMNS = ["rut", "fechaSolicitud", "fase", "acciones"];
  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  return (
    <div className={styles.AdminDiv}>
      <div className={styles.boxp10}>
        <NextLink href="https://informatica.uv.cl/">
          <Image
            radius="none"
            src="../UV.svg"
            alt="Descripción del SVG"
            width={"100%"}
            height={"50%"}
          />
          <Image
            radius="none"
            src="../Logo_Practica_Blanco.svg"
            alt="Descripción del SVG"
            width={"100%"}
            height={"50%"}
          />
        </NextLink>
        <div className={styles.boxc11}>Icono Plataforma</div>
        <div className={styles.boxe12}>
          <Button className={styles.botones}>boton1</Button>
          <Button className={styles.botones}>boton1</Button>
          <Button className={styles.botones}>boton1</Button>
          <Button className={styles.botones}>Logout</Button>
        </div>
      </div>
      <div className={styles.boxp20}>
        <div className={styles.boxp21}>ICONOUSER</div>
        <div className={styles.boxp22}>
          <div className={styles.boxp220}>Titulos1</div>
          <div className={styles.boxp221}>
            <div className={styles.boxp2210}>
              <p>Search</p>
              <p>Boton</p>
            </div>
            <div className={styles.boxp2211}>
              <TAB
                columns={columns}
                statusOptions={statusOptions}
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                FuncionDatos={AllSoli}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
