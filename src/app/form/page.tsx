"use client";

import React from "react";
import FormProvider from "@/context/FormContext";
import FormCard from "@/components/form/FormCard";
import MeshGradientBackground from "@/components/gradient/MeshGradientBackground";
import Navbar from "@/components/navbar/Navbar";

const Page = () => {
  return (
    <FormProvider>
      <Navbar className="fixed" profilecard={false}/>
    <MeshGradientBackground />
     <div className="h-screen w-screen flex justify-center items-center">
        <FormCard />
      </div>
    </FormProvider>
  );
};
export default Page;
