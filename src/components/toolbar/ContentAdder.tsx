import { BookText, BookUser, Link, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog as ShadDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useWidgetSelectorStore } from "@/store/WidgetSelector";
import { useState } from "react";
import { useSplatStore } from "@/store/Splat";
import { updateSplat } from "@/utils/UpdateSplat";
import { widget } from "@/types/splat";
import { amountZeroGrid } from "@/utils/Grid";

export type widgetType = "text" | "checklist" | "member" | "icon" | null;

interface WidgetProps {
  title: string;
  type: widgetType;
}
const WidgetSelector = ({ title, type }: WidgetProps) => {
  const { currentWidget, changeWidget } = useWidgetSelectorStore();
  return (
    <button
      className={`${type == currentWidget ? "text-primary-default border-primary-default" : "border-lines-default text-lines-default"} h-28 w-28 border-[2px] rounded-md flex justify-center flex-col gap-2`}
      onClick={() =>
        type == currentWidget ? changeWidget(null) : changeWidget(type)
      }
    >
      <div className="flex items-center justify-center w-full">
        {type === "text" && <BookText size={32} />}
        {type === "checklist" && <ListChecks size={32} />}
        {type === "member" && <BookUser size={32} />}
        {type === "icon" && <Link size={32} />}
      </div>
      <div className="flex items-center justify-center w-full">
        <p className="font-medium">{title}</p>
      </div>
    </button>
  );
};

interface ContentAdderProps {
  children?: React.ReactNode;
}
const ContentAdder = ({ children }: ContentAdderProps) => {
  const widgets: widgetType[] = ["text", "checklist", "member", "icon"];
  const norwegianTitles = new Map([
    ["text", "Tekst"],
    ["checklist", "Sjekkliste"],
    ["member", "Medlem"],
    ["icon", "Ikon"],
  ]);
  const { currentWidget } = useWidgetSelectorStore();
  const { id, grid, content, addStoreContent } = useSplatStore();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  function checkForm() {
    let error = "";
    if (amountZeroGrid(grid!) === 0) {
      error = "Griden er full!";
    }
    if (!value) {
      error = "Legg til en tittel";
    }
    if (!currentWidget) {
      error = "Velg en widget";
    }
    setError(error);
    return error;
  }

  function findPossibleId(content: widget[] | null): number {
    if (!content) throw new Error("Content is not defined");
    const ids = content.map((widget) => widget.id);
    const id = Math.max(...ids) + 1;
    return id;
  }

  function saveContent() {
    if (!content || !grid) throw new Error("Content is not defined");
    const widgetId = findPossibleId(content);
    addStoreContent({
      id: widgetId,
      title: value,
      type: currentWidget!,
      content: [],
    });
    updateSplat(id, { grid, content });
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-background-widget py-8 w-fit h-fit min-w-fit">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            Velg en widget
          </DialogTitle>
          <DialogDescription className="text-[14px]">
            Velg en widget å legge til Splaten
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 relative">
          <div className="flex items-center gap-12 py-3">
            {widgets.map((widget: widgetType) => (
              <WidgetSelector
                key={widget}
                title={norwegianTitles.get(widget!) || ""}
                type={widget}
              />
            ))}
          </div>
          <div>
            <DialogDescription className="text-[14px]">
              Velg en tittel for din widget
            </DialogDescription>
            <div className="py-4">
              <Input
                value={value}
                onChange={handleChange}
                type="text"
                placeholder="Legg til tittel..."
              />
            </div>
          </div>
        </div>
        <DialogFooter className="py-2">
          <div className="flex w-full justify-between items-center">
            <p className="text-error-default">{error}</p>
            <Button
              className="bg-primary-second text-md text-white"
              onClick={() => createWidget()}
            >
              Lag widget
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </ShadDialog>
  );
};

export default ContentAdder;
