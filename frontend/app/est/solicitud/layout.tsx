import { Navbar } from "../../../components/navbar";
import styles from "../../styles/styleop.module.css";
export default function SoliLayout({
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
