import { useState } from "react";
import Slider from "@mui/material/Slider";
import { formField } from "@/types/FormData";

interface SliderInputProps {
  field: formField;
  setAnswer: (fieldId: number, answer: string) => void;
}

const SliderInput = ({ field, setAnswer }: SliderInputProps) => {
  const { options } = field;
  if (!options) {
    return null;
  }

  const marks = options.map((label, index) => ({
    value: index,
    label,
  }));

  const initialValue = field.value
    ? marks.findIndex((mark) => mark.label === field.value)
    : 0;
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    setAnswer(field.id, options[newValue as number]);
  };

  return (
    <div className="flex flex-col items-center justify-center px-2 flex-1 flex-wrap w-[65ch]">
      <p className="text-2xl">{options[value]} personer</p>
      <div className="w-[400px] mx-auto py-12">
        <Slider
          value={value}
          onChange={handleChange}
          step={null}
          marks={marks}
          min={0}
          max={marks.length - 1}
          valueLabelDisplay="off"
          aria-labelledby="discrete-slider"
          className="
            [&_.MuiSlider-track]:bg-black [&_.MuiSlider-track]:h-1
            [&_.MuiSlider-rail]:bg-white [&_.MuiSlider-rail]:h-1 [&_.MuiSlider-rail]:opacity-100
            [&_.MuiSlider-mark]:bg-white [&_.MuiSlider-mark]:h-3 [&_.MuiSlider-mark]:w-3 [&_.MuiSlider-mark]:rounded-full [&_.MuiSlider-mark]:-ml-[6px]
            [&_.MuiSlider-markActive]:bg-black
            [&_.MuiSlider-markLabel]:text-gray-500 [&_.MuiSlider-markLabel]:text-base [&_.MuiSlider-markLabel]:font-inherit
            [&_.MuiSlider-thumb]:w-5 [&_.MuiSlider-thumb]:h-5 [&_.MuiSlider-thumb]:bg-black [&_.MuiSlider-thumb]:shadow-none
            [&_.MuiSlider-thumb:hover]:w-[22px] [&_.MuiSlider-thumb:hover]:h-[22px] [&_.MuiSlider-thumb:hover]:shadow-none
            [&_.MuiSlider-thumb.Mui-active]:w-[22px] [&_.MuiSlider-thumb.Mui-active]:h-[22px] [&_.MuiSlider-thumb.Mui-active]:shadow-none
          "
        />
      </div>
    </div>
  );
};

export default SliderInput;
