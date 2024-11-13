import React from "react";

interface StepperProps {
  currentStep: number;
  numberOfSteps: number;
  labels: string[];
}

const Stepper: React.FC<StepperProps> = ({
  currentStep,
  numberOfSteps,
  labels,
}) => {
  const activeStyles = (index: number) =>
    currentStep === index
      ? "bg-black border-black"
      : currentStep > index
        ? "bg-black border-black"
        : "bg-transparent border-gray";
  const activeLines = (index: number) =>
    currentStep > index ? "bg-black" : "bg-gray-300";
  const activeLabels = (index: number) =>
    currentStep === index ? "text-black" : "text-gray-300";

  return (
    <div className="flex flex-col items-start pl-10">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={`w-3.5 h-3.5 rounded-full border ${activeStyles(index)}`}
            ></div>
            <span className={`ml-2 text-sm ${activeLabels(index)}`}>
              {labels[index]}
            </span>
          </div>
          {index < numberOfSteps - 1 && (
            <div className={`w-px h-16 ml-1.5 ${activeLines(index)}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
