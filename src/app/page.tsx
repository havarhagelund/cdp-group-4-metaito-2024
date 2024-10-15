"use client";
import Navbar from "@/components/navbar/Navbar";
import Toolbar from "@/components/toolbar/Toolbar";
import GridContainer from "@/components/content/GridContainer";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="py-2">
        <div className="fixed h-full right-4 top-0 flex justify-center items-center">
          <Toolbar />
        </div>
        <section className="px-16 font-medium tracking-wide space-y-2 cursor-default">
          <p className="text-text-subheader text-xl">Customer Driven Project</p>
          <p className="text-text-header text-4xl">AI Structure Assistant</p>
        </section>
        <section className="flex h-fit w-full">
          <GridContainer />
        </section>
      </main>
    </>
  );
};

export default Home;
