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
import { updateSplat } from "@/utils/UpdateSplat";

const formSchema = z.object({
  url: z.string().min(1),
});

interface EditIconPopupProps {
  widgetId: number;
  dropletId: number;
  children?: React.ReactNode;
}

const EditIconPopup = ({
  widgetId,
  dropletId,
  children,
}: EditIconPopupProps) => {
  const { id, content, grid, addStoreDroplet, removeStoreDroplet } =
    useSplatStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!grid || !content) throw new Error("Grid or content is missing");
    removeStoreDroplet(widgetId, dropletId);
    addStoreDroplet(widgetId, dropletId, {
      id: dropletId,
      url: values.url,
      placeholder: false,
    });
    updateSplat(id, { grid, content });
  }

  return (
    <ShadDialog>
      <DialogTrigger asChild>
        <button>{children}</button>
      </DialogTrigger>
      <DialogContent className="bg-background-widget py-8 w-5/6 h-fit">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            Legg til ikon
          </DialogTitle>
          <DialogDescription className="text-[14px]">
            Legg til en ikon droplet til din Splat
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between pt-2 pb-10 w-full">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Url av ikon lenke</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Legg til url av ikonet..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="py-2">
              <div className="flex w-full justify-end items-center">
                <Button
                  type="submit"
                  className="bg-primary-second text-md text-white"
                >
                  Endre widget
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </ShadDialog>
  );
};

export default EditIconPopup;
