import { useState } from "react";
import { Input } from "../ui/input";
import { CheckIcon } from "lucide-react";
import { updateSplat } from "@/utils/update-splat";
import { useSplatStore } from "@/store/Splat";

interface EditableTitleProps {
  className?: string;
  title: string;
  updateTitle: (title: string) => void;
}

const EditableTitle = ({ className, title, updateTitle }: EditableTitleProps) => {
  const { id } = useSplatStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const newValue = event.target.value;
    setValue(newValue);
  };

  function saveTitle() {
    setIsEditing(false);
    updateTitle(value);
  }

  return (
    <div className={`${className} `}>
      {
        !isEditing ?
          (
            <p onClick={() => setIsEditing(true)} className="cursor-text hover:scale-105 transition-transform origin-left">{title}</p>
          )
          :
          (
            <div className="flex gap-4">
              <Input
                value={value}
                onChange={handleChange}
                type="text"
                placeholder="Insert title here..."
                className="w-96"
                autoFocus={true}
              />
              <div>
                <button className="bg-primary-default w-10 h-full flex justify-center items-center rounded-md" onClick={() => saveTitle()}>
                  <CheckIcon className="text-white" />
                </button>
              </div>
            </div>
          )
      }
    </div>
  );
}

export default EditableTitle;
