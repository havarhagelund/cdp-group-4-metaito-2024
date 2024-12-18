import React, { useState, useEffect } from "react";
import { formField } from "@/types/FormData";

interface MultiSelectInputProps {
  field: formField;
  setAnswer: (fieldId: number, answer: string[]) => void;
}

const MultiSelectInput = ({ field, setAnswer }: MultiSelectInputProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    field.value || [],
  );
  const [customOption, setCustomOption] = useState<string>(
    field.value?.find((o: string) => !field.options?.includes(o)) || "",
  );

  const handleCustomOption = (option: string) => {
    if (option === "") {
      if (selectedOptions.includes(customOption)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== customOption));
      }
      setCustomOption(option);
      return;
    }
    if (!selectedOptions.includes(customOption)) {
      setSelectedOptions([...selectedOptions, option]);
      setCustomOption(option);
    } else {
      setSelectedOptions(
        selectedOptions.map((o) => (o === customOption ? option : o)),
      );
      setCustomOption(option);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    setAnswer(field.id, selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="w-full h-full flex flex-col justify-evenly items-center gap-5">
      <div className={`grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-3 ${(field.options?.length ?? 0) > 10 ? 'w-4/5' : 'w-4/6'}`}>
        {field.options?.map((option) => {
          if (option === "Annet") {
            return;
          }
          const selected = selectedOptions.includes(option);
          return (
            <div
              className={`h-16 w-full p-3 bg-white border border-gray-300 rounded-lg cursor-pointer flex items-center justify-center text-center ${selected ? "border-gray-900" : ""}`}
              key={option} onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
      {
        field.options?.includes("Annet") && (
          <div className='flex flex-col gap-y-2'>
            <label>
              Hvis ingen av alternativene passer, vennligst spesifiser:
            </label>
            <input
              type="text"
              placeholder='Skriv inn her...'
              value={customOption}
              onChange={(e) => handleCustomOption(e.target.value)}
              className={`h-16 w-full p-3 bg-white border border-gray-300 rounded-lg cursor-text focus:outline-none ${customOption ? "border-gray-900" : ""}`}
            />
          </div>
        )
      }
    </div >
  );
};

export default MultiSelectInput;
