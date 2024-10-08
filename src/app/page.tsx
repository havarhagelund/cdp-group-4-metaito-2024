import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="px-16 py-2">
        <section className="font-medium tracking-wide space-y-2 cursor-default">
          <p className="text-text-subheader text-xl">Customer Driven Project</p>
          <p className="text-text-header text-4xl">AI Structure Assistant</p>
        </section>
      </main>
    </>
  );
}
