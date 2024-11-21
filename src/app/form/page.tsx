"use client";

import React from "react";
import FormProvider from "@/context/FormContext";
import FormCard from "@/components/form/FormCard";
import { MeshGradientRenderer } from "@johnn-e/react-mesh-gradient";

const Page = () => {
  return (
    <FormProvider>
      <MeshGradientRenderer
        className="gradient"
        colors={["#E0FFFF", "#E1FFFF", "#BBDEE3", "#E9F9FB", "#E9F9FB"]}
        wireframe={false}
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
        }}
      />
      <div className="h-screen w-screen flex justify-center items-center">
        <FormCard />
      </div>
    </FormProvider>
  );
};
export default Page;
