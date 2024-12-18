"use client";
import React, { useState, useRef} from "react";
import {
  Card
} from "@nextui-org/react";
import styles from "@/styles/est.module.css";
import {Home, User} from "lucide-react";
import TablaBoss from "@/components/Tablas/TabBoss/TablaBoss";
export default function HomeBoss() {
  const resumenRef = useRef<HTMLDivElement>(null);
  const [a_resumen, setA_resumen] = useState(false);
  const Token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const redireccion = (ref: React.RefObject<HTMLDivElement>, funcion: (arg: boolean) => void) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    funcion(true);
    setTimeout(() => {
      funcion(false);
    }, 2000);
  };
  return (
    <div className={styles.body}>
      <div className={styles.navbar}>
        <a
          className={`${styles.btn_nav}`}
          onClick={() => redireccion(resumenRef, setA_resumen)}
        >
          <Home className="w-5 h-5 mr-2" />
          Inicio
        </a>
        <a className={styles.btn_nav}>
          <User className="w-5 h-5 mr-2" />
          Cerrar Sesión
        </a>
      </div>
      <div className={styles.EstDiv}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Solicitudes</h1>
        </div>
        <Card ref={resumenRef} className={`mb-6 ${styles.box} ${a_resumen ? styles.active : ""}`}>
          <h1 className="text-3xl font-bold text-gray-800 pt-[2rem] pl-[2rem]">
            Resumen de solicitudes
          </h1>
          <h2 className="text-1xl text-gray-400 pl-[2rem]">
            Vista general de solicitudes recibidas
          </h2>
          <div className={styles.divtable}>
            <TablaBoss/>
          </div>
        </Card>
      </div>
    </div>
  );
}
