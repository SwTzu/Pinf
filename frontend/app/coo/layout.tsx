"use client";
import { usePathname } from 'next/navigation';
import styles from '@/styles/body.module.css';
import {Home,UserX, ChartColumn, Building2,LayoutPanelLeft} from 'lucide-react';
export default function CooLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className={styles.body}>
      <div className={styles.navbar}>
        <a href="/coo" className={`${styles.btn} ${isActive('/coo') ? styles.active : ''}`} >
          <Home className='mr-[0.5rem]'/>Inicio
        </a>
        <a href="/coo/stats" className={`${styles.btn}${isActive('/coo/sectores') ? styles.active : ''}`} >
          <ChartColumn className='mr-[0.5rem]'/>Estadísticas
        </a>
        <a href="/coo/emp" className={`${styles.btn}${isActive('/coo/emp') ? styles.active : ''}`} >
          <Building2 className='mr-[0.5rem]'/>Empresas
        </a>
        <a href="/coo/dnd" className={`${styles.btn}${isActive('/coo/dnd') ? styles.active : ''}`} >
          <LayoutPanelLeft className='mr-[0.5rem]'/>Espacio
        </a>
        <a href="/coo/logout" className={`${styles.btn} ${styles.logoutBtn}`} >
          <UserX className='mr-[0.5rem]'/>Cerrar Sesión
        </a>
      </div>
      <section id="secctioncoo">{children}</section>
    </div>
  );
}
