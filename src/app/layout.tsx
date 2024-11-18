import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Fs ai assistant",
  description:
    "An assistant specialized in helping you get started with Factsplat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
