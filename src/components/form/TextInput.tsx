import { FormField } from "@/types/FormData";
import { useState } from "react";


interface TextInputProps {
    field: FormField,
    setAnswer: (questionId: number, answer: any) => void,
}

const TextInput = ({ field, setAnswer }: TextInputProps) => {
    const [value, setValue] = useState<string | undefined>(field.value);

    const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setAnswer(field.id, e.target.value);
    };

    return (
        <div className="flex flex-col gap-2">
            <input
                type="text"
                id={field.label}
                name={field.label}
                value={value}
                onChange={handleTextInput}
                className="border border-gray-300 rounded-lg p-2"
            />
        </div>
    )
}

export default TextInput;