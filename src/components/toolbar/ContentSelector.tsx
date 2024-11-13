import { BookText, BookUser, ListChecks } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog as ShadDialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWidgetSelectorStore } from "@/store/WidgetSelector"
import { useState } from "react"
import { useSplatStore } from "@/store/Splat"
import { updateSplat } from "@/utils/update-splat"

export type widgetType = "text" | "checklist" | "member" | null;

interface WidgetProps {
  title: string;
  type: widgetType;
}
const WidgetSelector = ({ title, type }: WidgetProps) => {
  const { currentWidget, changeWidget } = useWidgetSelectorStore();
  return (
    <button className={`${type == currentWidget ? "text-primary-default border-primary-default" : "border-lines-default text-lines-default"} h-28 w-28 border-[2px] rounded-md flex justify-center flex-col gap-2`} onClick={() => type == currentWidget ? changeWidget(null) : changeWidget(type)}>
      <div className="flex items-center justify-center w-full">
        {
          type === "text" && <BookText size={32} />
        }
        {
          type === "checklist" && <ListChecks size={32} />
        }
        {
          type === "member" && <BookUser size={32} />
        }
      </div>
      <div className="flex items-center justify-center w-full">
        <p className="font-medium">{title}</p>
      </div>
    </button>
  );
}

interface ContentSelectorProps {
  children?: React.ReactNode
}
const ContentSeletor = ({ children }: ContentSelectorProps) => {
  const widgets: widgetType[] = ["text", "checklist", "member"]
  const { currentWidget } = useWidgetSelectorStore();
  const { id, grid, content, addStoreContent } = useSplatStore();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  function checkForm() {
    let error = ""
    if (!currentWidget) {
      error = "Please select a widget";
    }
    if (!value) {
      error = "Please enter a title";
    }
    setError(error);
    return error;
  }

  function getPossibleId() {
    if (!content) throw new Error("Content is not defined");
    return content.length + 1;
  }

  function saveContent() {
    if (!content || !grid) throw new Error("Content is not defined");
    addStoreContent({
      id: getPossibleId(),
      title: value,
      type: currentWidget!,
      content: [],
    });
    updateSplat(id, {grid, content});
  }

  function createWidget() {
    const error = checkForm();
    if (error !== "") return;

    saveContent();
    setOpen(false);
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <ShadDialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-background-widget py-8 w-fit h-fit">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose a Widget</DialogTitle>
          <DialogDescription className="text-[14px]">
            Select a droplet to add to the splat
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 relative">
          <div className="flex items-center gap-12 py-3">
            {
              widgets.map((widget: widgetType) => (
                <WidgetSelector
                  key={widget}
                  title={widget?.charAt(0).toUpperCase() + widget!.slice(1)}
                  type={widget}
                />
              ))
            }
          </div>
          <div>
            <DialogDescription className="text-[14px]">
              Choose a title for the droplet
            </DialogDescription>
            <div className="py-4">
              <Input value={value} onChange={handleChange} type="text" placeholder="Insert title here..." />
            </div>
          </div>
        </div>
        <DialogFooter className="py-2">
          <div className="flex w-full justify-between items-center">
            <p className="text-error-default">{error}</p>
            <Button className="bg-primary-second text-md text-white" onClick={() => createWidget()}>Create Widget</Button>
          </div>
        </DialogFooter>
      </DialogContent >
    </ShadDialog >
  )
}

export default ContentSeletor;
