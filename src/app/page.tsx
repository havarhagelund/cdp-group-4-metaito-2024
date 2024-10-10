"use client";
import Navbar from "@/components/navbar/Navbar";
import Content from "@/components/content/Content";
import Toolbar from "@/components/toolbar/Toolbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="py-2">
        <section className="px-16 font-medium tracking-wide space-y-2 cursor-default">
          <p className="text-text-subheader text-xl">Customer Driven Project</p>
          <p className="text-text-header text-4xl">AI Structure Assistant</p>
        </section>
        <section className="flex h-fit w-full">
          <Content />
          <div className=" flex justify-end items-center">
            <Toolbar />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
