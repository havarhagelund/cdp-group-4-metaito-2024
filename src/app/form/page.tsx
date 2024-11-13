"use client"; 

import React from "react";
import FormProvider from "@/context/FormContext";
import FormCard from "@/components/form/FormCard";


const Page = () => {
  return (
    <FormProvider>
        <div className="h-screen w-screen flex justify-center items-center">
            <FormCard />
        </div>
    </FormProvider>
  );
}
export default Page;
