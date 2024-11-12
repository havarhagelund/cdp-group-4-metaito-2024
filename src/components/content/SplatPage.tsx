"use client";
import { grid } from "@/types/layout";
import Toolbar from "../toolbar/Toolbar"
import GridContainer from "./GridContainer"
import { splat, widget } from "@/types/splat";
import { create } from "zustand";
import { useEffect } from "react";
import { useSplatStore } from "@/store/Splat";
import Navbar from "../navbar/Navbar";
import Spinner from "../loading/Spinner";


interface SplatPageProps {
  splat: splat;
}

const SplatPage = ({ splat }: SplatPageProps) => {
  const { title, subtitle, grid, content, updateStoreId, updateStoreTitle, updateStoreSubtitle, updateStoreGrid, updateStoreContent } = useSplatStore();

  useEffect(() => {
    updateStoreId(splat.id);
    updateStoreTitle(splat.title);
    updateStoreSubtitle(splat.subtitle);
    updateStoreGrid(splat.grid);
    updateStoreContent(splat.content);
  }, [])

  if (!grid) {
    return <div className="h-screen w-full flex items-center justify-center">
      <Spinner size="large" className="text-primary-default" />
    </div>;
  }

  return (
    <>
      <Navbar />
      <main className="py-2">
        <div className="fixed h-full right-4 top-0 flex justify-center items-center">
          <Toolbar />
        </div>
        <section className="px-16 font-medium tracking-wide space-y-2 cursor-default">
          <p className="text-text-subheader text-xl">{subtitle}</p>
          <p className="text-text-header text-4xl">{title}</p>
        </section>
        <section className="flex h-fit w-full">
          <GridContainer />
        </section>
      </main>
    </>

  )
}

export default SplatPage;
