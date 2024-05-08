import styles from "../../styles/styleop.module.css";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section id="secctionadm">{children}</section>;
}
