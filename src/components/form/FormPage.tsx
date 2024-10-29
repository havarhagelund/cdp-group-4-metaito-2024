// rm -rf .next/cache    -if not updating
"use client"
import FormCard from "@/components/form/FormCard";
import Stepper from "@/components/stepper/Stepper";
import { useState } from "react";
import { formData } from "@/data/Form";


const FormPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const formContent = formData.content[currentStep];
    const numOfSteps = formData.labels.length
    const goToNextStep = () => {
        if (currentStep < numOfSteps - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };


    return (
        <div className="grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] min-h-screen">
            <div className="row-span-full bg-white pt-40">
                <Stepper currentStep={currentStep} numberOfSteps={numOfSteps} labels={formData.labels} />
            </div>
            <section className="px-16 font-medium tracking-wide space-y-2 cursor-default pt-24">
                <p className="text-text-header text-4xl">
                    {formContent.question}
                </p>
                {currentStep > 0 && (
                    <button className="flex items-center text-primary-default font-medium hover:text-primary-second transition-colors duration-300"
                        onClick={goToPreviousStep}>
                        <span className="mr-2">←</span>
                        <span>Tilbake</span>
                    </button>)}
            </section>
            <div className="grid grid-cols-5 auto-rows-min-1 p-10 w-fit gap-4">
                {formContent.answers.map((answer, index) => (
                    <FormCard key={index} card={{ title: answer, icon: <span role="img" aria-label="heart-eyes"> 😍 </span> }} />
                ))}
                {/* Need to add the implementation of adding icons that fits description */}
                <div className="col-start-1 row-start-auto col-span-full m-2">
                    <div className="flex items-center justify-center h-12 w-28 rounded-md bg-primary-default text-white cursor-pointer hover:bg-primary-second transition-colors duration-300"
                        onClick={goToNextStep}>Neste</div>
                </div>
            </div>
        </div>
    );
};
export default FormPage;
