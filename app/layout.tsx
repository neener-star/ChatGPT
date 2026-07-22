import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUGUST | The T.W.I.N. System",
  description: "A personal behavioral twin interface.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
