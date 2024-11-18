"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
import { useSplatStore } from "@/store/Splat";
import { updateSplat } from "@/utils/update-splat";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1),
});

interface EditChecklistPopupProps {
  widgetId: number;
  dropletId: number;
  children?: React.ReactNode;
}

const EditChecklistPopup = ({
  widgetId,
  dropletId,
  children,
}: EditChecklistPopupProps) => {
  const [error, setError] = useState<string>("");
  const { id, content, grid, addStoreDroplet, removeStoreDroplet } = useSplatStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!grid || !content) throw new Error("Grid or content is missing");
    removeStoreDroplet(widgetId, dropletId);
    addStoreDroplet(widgetId, dropletId, {
      id: dropletId,
      order: dropletId,
      title: values.title,
      checked: false,
      placeholder: false,
    });
    updateSplat(id, { grid, content });
  }

  return (
    <ShadDialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-background-widget py-8 w-5/6 h-fit">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Check Item Droplet</DialogTitle>
          <DialogDescription className="text-[14px]">
            Add a check item to your checklist
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between pt-2 pb-10 w-full">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Title of Check Item</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Insert title of check item..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="py-2">
              <div className="flex w-full justify-between items-center">
                <p className="text-error-default">{error}</p>
                <Button
                  type="submit"
                  className="bg-primary-second text-md text-white"
                >
                  Edit Widget
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </ShadDialog>
  );
};

export default EditChecklistPopup;
