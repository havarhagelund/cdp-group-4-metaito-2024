import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../styles/globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}
