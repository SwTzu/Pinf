import styles from "../../styles/styleop.module.css";
export default function EstLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
