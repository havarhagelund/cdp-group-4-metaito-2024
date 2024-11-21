import React, { createContext, useState, ReactNode } from "react";
import { formData } from "@/types/FormData";
import mockData from "@/data/MockData";

interface FormContextType {
  formData: formData;
  setFormData: (data: formData) => void;
}

export const FormContext = createContext<FormContextType>(
  {} as FormContextType,
);

interface FormProviderProps {
  children: ReactNode;
}

const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<formData>(mockData);
  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
