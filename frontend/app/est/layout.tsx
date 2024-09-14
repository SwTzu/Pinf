"use client";
import { usePathname } from 'next/navigation';
import styles from '@/styles/body.module.css';
import { Bell, BookOpen, Calendar, FileText, Home, MessageSquare, Settings, User } from "lucide-react"
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className={styles.body}>
      <div className={styles.navbar}>
        <a href="/est" className={`${styles.btn} ${styles.homeBtn} ${isActive('/est') ? styles.active : ''}`}>
        <Home className="w-5 h-5 mr-2" />Inicio
        </a>
        <a href="/est/solicitud" className={`${styles.btn} ${styles.sectoresBtn} ${isActive('/est') ? styles.active : ''}`} >
        <FileText className="w-5 h-5 mr-2" />Solicitudes
        </a>
        <a href="/est/acp" className={`${styles.btn} ${styles.sectoresBtn} ${isActive('/est/acp') ? styles.active : ''}`} >
        <FileText className="w-5 h-5 mr-2" />Acp
        </a>
        <a href="/" className={`${styles.btn} ${styles.logoutBtn}`} >
        <User className="w-5 h-5 mr-2" />Cerrar Sesión
        </a>
      </div>
      <section id="secctionadm">{children}</section>
    </div>
  );
}
