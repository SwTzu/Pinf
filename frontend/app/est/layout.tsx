"use client";
import { usePathname } from 'next/navigation';
import styles from '@/styles/body.module.css';
import { FileText, Home, MessageSquare, Settings, User } from "lucide-react"
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className={styles.body}>
      <section id="secctionest">{children}</section>
    </div>
  );
}
