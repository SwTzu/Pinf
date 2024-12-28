"use client";
import { usePathname } from "next/navigation";
import styles from "@/styles/coo.module.css";
import {
  Home,
  UserX,
  ChartColumn,
  Building2,
  LayoutPanelLeft,
} from "lucide-react";
import { funcionLogOut } from "@/api/standar";
export default function CooLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <div className={styles.body}>
      <div className={styles.navbar}>
        <a
          href="/coo"
          className={`${styles.btn} ${isActive("/coo") ? styles.active : ""}`}
        >
          <Home className="mr-2 flex-shrink-0" size={24} />
          <span className={styles.nav_text}>Inicio</span>
        </a>
        <a
          href="/coo/stats"
          className={`${styles.btn} ${
            isActive("/coo/stats") ? styles.active : ""
          }`}
        >
          <ChartColumn className="mr-2 flex-shrink-0" size={24} />
          <span className={styles.nav_text}>Estadísticas </span>
        </a>
        <a
          href="/coo/emp"
          className={`${styles.btn} ${
            isActive("/coo/emp") ? styles.active : ""
          }`}
        >
          <Building2 className="mr-2 flex-shrink-0" size={24} />
          <span className={styles.nav_text}>Empresas </span>
        </a>
        <a
          href="/coo/workspace"
          className={`${styles.btn} ${
            isActive("/coo/workspace") ? styles.active : ""
          }`}
        >
          <LayoutPanelLeft className="mr-2 flex-shrink-0" size={24} />
          <span className={styles.nav_text}>Workspace </span>{" "}
        </a>
        <a
          href="/"
          className={`${styles.btn} ${styles.logoutBtn}`}
          onClick={funcionLogOut}
        >
          <UserX className="mr-2 flex-shrink-0" size={24} />
          <span className={styles.nav_text}>Cerrar Sesión </span>
        </a>
      </div>
      <section id="secctioncoo">{children}</section>
    </div>
  );
}
