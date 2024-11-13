import React, { createContext, useState, ReactNode } from 'react';
import { FormData } from '@/types/FormData';
import mockData from '@/data/MockData';

interface FormContextType {
    formData: FormData;
    setFormData: (data: FormData) => void;
}

export const FormContext = createContext<FormContextType>({} as FormContextType);

interface FormProviderProps {
    children: ReactNode;
}

const FormProvider = ({ children }: FormProviderProps) => {
    const [formData, setFormData] = useState<FormData>(mockData);
    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export default FormProvider;