"use client";
import { Image } from "@nextui-org/react";
import styles from "../styles/styleop.module.css";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.BaseHome}>
      <div className={styles.bloquehome}>
        <NextLink onClick={()=>{
          const userType='est';
          localStorage.setItem('userType', userType);}
          } href={{ pathname: "/login" }}>
          <Image
            className={styles.homeCard}
            isBlurred
            isZoomed
            radius="none"
            alt="Estudiante"
            src="/Students.svg"
          />
          <p className={styles.Texthome}>Estudiante</p>
        </NextLink>
        <NextLink onClick={()=>{
          const userType='coo';
          localStorage.setItem('userType', userType);}
          } href={{ pathname: "/login" }}>
          <Image
            className={styles.homeCard}
            isBlurred
            isZoomed
            radius="none"
            alt="Coordinador"
            src="/Coordinador.svg"
          />
          <p className={styles.Texthome}>Coordinador/a</p>
        </NextLink>
        <NextLink onClick={()=>{
          const userType='adm';
          localStorage.setItem('userType', userType);}
          } href={{ pathname: "/login" }}>
          <Image
            className={styles.homeCard}
            isBlurred
            isZoomed
            radius="none"
            alt="Administrador"
            src="/Administracion.svg"
          />
          <p className={styles.Texthome}>Administracion</p>
        </NextLink>
        <NextLink onClick={()=>{
          const userType='boss';
          localStorage.setItem('userType', userType);}
          } href={{ pathname: "/login" }}>
          <Image
            className={styles.homeCard}
            isBlurred
            isZoomed
            radius="none"
            alt="JefeCarrera"
            src="/Boss.svg"
          />
          <p className={styles.Texthome}>Jefe/a de Carrera</p>
        </NextLink>
        <NextLink onClick={()=>{
          const userType='sup';
          localStorage.setItem('userType', userType);}
          } href={{ pathname: "/login" }}>
          <Image
            className={styles.homeCard}
            isBlurred
            isZoomed
            radius="none"
            alt="Supervisor"
            src="/Supervision.svg"
          />
          <p className={styles.Texthome}>Supervisor/a</p>
        </NextLink>
      </div>
    </div>
  );
}
