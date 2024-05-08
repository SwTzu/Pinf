"use client";
import React, { useState, useEffect } from "react";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/router"; // Importa el router de Next.js
import styles from "../../styles/styleop.module.css";
import NextLink from "next/link";
import Tareas from "../../components/tareas";
export default function Coor() {
  //ejemplo de los datos
  return (
    <div className={styles.CooDiv}>
      <div className={styles.boxc10}>
      <NextLink href="https://informatica.uv.cl/" className={styles.boxc13}>
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
          
        <div className={styles.boxc12}>
          <Button className={styles.botcoo} variant="light">
            Boton
          </Button>
          <Button className={styles.botcoo} variant="light">
            Boton
          </Button>
          <Button className={styles.botcoo} variant="light">
            Boton
          </Button>
          <Button className={styles.botcoo} variant="light">
            Boton
          </Button>
          <Button className={styles.botcoo} variant="light">
            Boton
          </Button>
          <Button className={styles.botcoo} variant="light">
            Boton
          </Button>
        </div>
      </div>
      <div className={styles.boxc20}>
        <div className={styles.boxc21}> iconos notificaciones, usuario</div>
        <div className={styles.boxc22}>
          <div className={styles.boxc220}>Titulos1</div>
          <div className={styles.boxc221}>
            <div className={styles.boxc2210}>
              <div className={styles.boxc22100}> Graficos </div>
              <div className={styles.boxc22100}> Estadisticas </div>
              <div className={styles.boxc22100}> Estadistica 2 </div>
            </div>
            <div className={styles.boxc2211}>
              <div className={styles.boxc22110}>
                <div className={styles.boxc221100}> Iconos cambio tabla1 </div>
                <div className={styles.boxc221101}> Iconos cambio tabla2 </div>
                <div className={styles.boxc221102}> Iconos cambio tabla3 </div>
              </div>
              <div className={styles.boxc22111}>
                <Tareas/>
              </div>
              <div className={styles.boxc22112}>
                <div className={styles.boxc221120}> Ultimas notifiaciones </div>
                <div className={styles.boxc221121}> Ultimas notifiaciones </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
