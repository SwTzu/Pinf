import styles from "../../styles/styleop.module.css";
import { Navbar } from "../../../components/navbar";
export default function AcpLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			{children}
		</section>
	);
}
