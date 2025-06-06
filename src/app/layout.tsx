import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Prueba Practica Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="container mx-auto p-6 bg-[#f2f2f3]">{children}</body>
    </html>
  );
}
