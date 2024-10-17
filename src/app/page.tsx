"use client";
import Navbar from "@/components/navbar/Navbar";
import Toolbar from "@/components/toolbar/Toolbar";
import GridContainer from "@/components/content/GridContainer";
import { splatData } from "@/data/Splat";
import { useState } from "react";
import { splat } from "@/types/splat";

const Home = () => {
  const [splat] = useState<splat>(splatData);
  return (
    <>
      <Navbar />
      <main className="py-2">
        <div className="fixed h-full right-4 top-0 flex justify-center items-center">
          <Toolbar />
        </div>
        <section className="px-16 font-medium tracking-wide space-y-2 cursor-default">
          <p className="text-text-subheader text-xl">{splat.subtitle}</p>
          <p className="text-text-header text-4xl">{splat.title}</p>
        </section>
        <section className="flex h-fit w-full">
          <GridContainer content={splat.content} grid={splat.grid} />
        </section>
      </main>
    </>
  );
};

export default Home;
