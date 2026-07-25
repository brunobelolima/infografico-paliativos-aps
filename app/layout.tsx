import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resultados do II Curso de Abordagem Paliativa na APS",
  description:
    "Infográfico interativo com os resultados do curso por Telessaúde do projeto TeleNordeste-BP.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
