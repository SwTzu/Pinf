import styles from '../../styles/styleop.module.css';
export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className={styles.BaseLogin}>
				{children}
		</section>
	);
}
//{styles.fondologin}