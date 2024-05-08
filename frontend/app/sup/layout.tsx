import styles from "../../styles/styleop.module.css";
export default function SupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section id="secctionadm">{children}</section>;
}
