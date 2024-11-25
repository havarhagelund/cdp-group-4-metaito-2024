import { formField } from "@/types/FormData";
import { useState } from "react";

interface TextInputProps {
  field: formField;
  setAnswer: (questionId: number, answer: any) => void;
}

const TextInput = ({ field, setAnswer }: TextInputProps) => {
  const [value, setValue] = useState<string | undefined>(field.value);

  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setAnswer(field.id, e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 w-[65ch]">
      <textarea
        id={field.label}
        name={field.label}
        placeholder="Skriv inn her..."
        rows={3}
        value={value}
        onChange={handleTextAreaInput}
        className={`
                     w-full p-6 bg-white border border-gray-300
                    rounded-lg cursor-text focus:outline-none focus:border-gray-900`}
      />
    </div>
  );
};

export default TextInput;
