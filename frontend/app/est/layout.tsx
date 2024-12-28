"use client";
import styles from '@/styles/body.module.css';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.body}>
      <section id="secctionest">{children}</section>
    </div>
  );
}
