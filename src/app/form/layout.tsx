import "@/styles/globals.css";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="eng">
      <body>{children}</body>
    </html>
  )
}