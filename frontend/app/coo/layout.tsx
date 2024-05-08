import styles from "../../styles/styleop.module.css";
export default function CooLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
