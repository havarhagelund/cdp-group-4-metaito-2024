import { useState } from "react";
import { checkItem } from "@/types/splat";
import { size } from "@/types/layout";

interface CheckItemProps {
  currentSize: size;
  items: checkItem[];
}

const CheckItem = ({ items: initialItems, currentSize }: CheckItemProps) => {
  const [items, setItems] = useState<checkItem[]>(initialItems);

  const handleCheckboxChange = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item,
    );
    setItems(updatedItems);
  };

  return (
    <main
      style={{
        gridTemplateColumns: `repeat(${currentSize.width}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${currentSize.height}, minmax(0, 1fr))`,
      }}
      className="w-full h-full grid gap-4"
    >
      {items.map((item: checkItem, index: number) => (
        <main className="w-fit h-22 rounded-2xl flex" key={index}>
          <div className="flex items-center">
            {/* Custom Checkbox */}
            <input
              id={`checkbox-${index}`}
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(index)}
              className="hidden" // Hide the default checkbox
            />
            <label
              htmlFor={`checkbox-${index}`}
              className="relative flex items-center cursor-pointer"
            >
              <span
                className={`w-5 h-5 inline-block  rounded 
                  ${
                    item.checked
                      ? "bg-primary-default"
                      : "bg-gray-100 border-2 border-gray-300"
                  } 
                  transition-all duration-200 ease-in-out`}
              >
                {/* Checkmark for checked state */}
                {item.checked && (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </span>
              <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {item.title}
              </span>
            </label>
          </div>
        </main>
      ))}
    </main>
  );
};

export default CheckItem;
