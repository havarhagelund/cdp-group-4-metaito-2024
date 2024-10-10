"use client";
import Navbar from "@/components/navbar/Navbar";
import Content from "@/components/content/Content";
import Card from "@/components/widget/Card";
import Image from "next/image";
import { MousePosition } from "@/types/mouse";
import { useEffect, useState } from "react";

const Home = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: undefined, y: undefined });
  const getMousePosition = (ev: any) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };
  return (
    <>
      <Navbar />
      <main className="py-2">
        <section className="px-16 font-medium tracking-wide space-y-2 cursor-default">
          <p className="text-text-subheader text-xl">Customer Driven Project</p>
          <p className="text-text-header text-4xl">AI Structure Assistant</p>
        </section>
        <Content/>
      </main>
    </>
  );
}

export default Home;
