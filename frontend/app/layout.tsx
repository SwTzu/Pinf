import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import styles from "../styles/styleop.module.css";
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={clsx("font-sans antialiased", fontSans.variable)}
        style={{ width: "100vw", height: "100vh" }}
      >
        <main className={styles.main}>
          <Providers themeProps={{ attribute: "class" }}>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
