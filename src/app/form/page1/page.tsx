// rm -rf .next/cache    -if not updating
"use client"
import FormCard from "@/components/form/FormCard";
import Stepper from "@/components/stepper/Stepper";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const numOfSteps = 7;
  const labels = ["Bransje", "Ansettelsesforhold", "Størrelse", "Ansvarsområder", "Målsetting", "Utfordringer", "Verktøy"];
  return (
    <>
      <div className="grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] bg-blue-100">
        <div className="row-span-full pt-40 bg-white">
          <Stepper currentStep={currentStep} numberOfSteps={numOfSteps} labels={labels} />
        </div>
        <section className="px-16 font-medium tracking-wide space-y-2 cursor-default pt-24">
          <p className="text-text-header text-4xl">
            Hvilken bransje jobber din organsiasjon i?
          </p>
        </section>
        <div className="grid grid-cols-5 grid-rows-4 p-10 w-fit gap-4">
          {[
            { title: "Maritime", icon: "🚢" },
            { title: "Health", icon: "🏥" },
            { title: "Economy", icon: "💰" },
            { title: "Technology", icon: "🤖" },
            { title: "Home", icon: "🏠" },
            { title: "Maritime", icon: "🚢" },
            { title: "Health", icon: "🏥" },
            { title: "Economy", icon: "💰" },
            { title: "Technology", icon: "🤖" },
            { title: "Home", icon: "🏠" },
            { title: "Maritime", icon: "🚢" },
            { title: "Health", icon: "🏥" },
            { title: "Economy", icon: "💰" },
            { title: "Technology", icon: "🤖" },
          ].map((card, index) => (
            <FormCard
              key={index}
              card={{
                title: card.title,
                icon: (
                  <span role="img" aria-label={card.title.toLowerCase()}>
                    {card.icon}
                  </span>
                ),
              }}
            />
          ))}
          <div className="col-start-1 row-start-auto col-span-full m-2">
            <Button className="bg-primary-default text-white">Neste</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
