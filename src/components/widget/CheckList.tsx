import { checkItem } from "@/types/splat";
import { useSplatStore } from "@/store/Splat";
import EditChecklistPopup from "./EditChecklistPopup";

interface CheckItemProps {
  item: checkItem;
  index: number;
  handleCheckboxChange: (index: number) => void;
}

const CheckItem = ({ item, index, handleCheckboxChange }: CheckItemProps) => {
  return (
    <main className="w-fit h-22 rounded-2xl">
      <input
        id={`checkbox-${index}`}
        type="checkbox"
        checked={item.checked}
        onChange={() => handleCheckboxChange(index)}
        className="hidden"
        disabled={item.placeholder}
      />
      <label
        htmlFor={`checkbox-${index}`}
        className="relative flex items-center cursor-pointer gap-x-4"
      >
        <span
          className={`w-10 h-10 inline-block rounded
                  ${
                    item.checked && !item.placeholder
                      ? "bg-primary-default"
                      : "bg-gray-100 border-2 border-gray-300"
                  }
                  transition-all duration-200 ease-in-out`}
        >
          {item.checked && !item.placeholder && (
            <svg
              className="w-10 h-10 text-white"
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
              />
            </svg>
          )}
        </span>
        <p
          className={`${item.placeholder ? "text-lines-default hover:scale-[1.01] hover:text-gray-800 transition-transform" : "text-black"} text-lg`}
        >
          {item.placeholder ? "Add " + item.title : item.title}
        </p>
      </label>
    </main>
  );
};

interface ChecklistProps {
  id: number;
  items: checkItem[];
}

const Checklist = ({ id, items: initialItems }: ChecklistProps) => {
  const { updateStoreDroplets } = useSplatStore();

  function handleCheckboxChange(index: number) {
    const newItems = [...initialItems];
    newItems[index].checked = !newItems[index].checked;
    updateStoreDroplets(id, newItems);
  }

  return (
    <main className="w-full h-full flex flex-col pt-4 space-y-6 items-start">
      {initialItems.map((item: checkItem, index: number) =>
        item.placeholder ? (
          <EditChecklistPopup key={index} widgetId={id} dropletId={item.id}>
            <button className="text-start">
              <CheckItem
                key={index}
                item={item}
                index={index}
                handleCheckboxChange={handleCheckboxChange}
              />
            </button>
          </EditChecklistPopup>
        ) : (
          <CheckItem
            key={index}
            item={item}
            index={index}
            handleCheckboxChange={handleCheckboxChange}
          />
        ),
      )}
    </main>
  );
};

export default Checklist;
