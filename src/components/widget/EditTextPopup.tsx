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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useState } from "react";
import { updateSplat } from "@/utils/UpdateSplat";

const formSchema = z.object({
  title: z.string().optional(),
  url: z.string().min(1),
  type: z.string().min(0),
});

interface EditTextPopupProps {
  widgetId: number;
  dropletId: number;
  children?: React.ReactNode;
}

const EditTextPopup = ({
  widgetId,
  dropletId,
  children,
}: EditTextPopupProps) => {
  const { id, grid, content, removeStoreDroplet, addStoreDroplet } =
    useSplatStore();
  const [open, setOpen] = useState<boolean>(false);
  const titles = new Map([
    ["text", "Underskrift"],
    ["link", "Url"],
    ["phone", "Telefon nummer"],
    ["email", "Epost adresse"],
  ]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      type: "text",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!grid || !content) throw new Error("Grid or content is not defined");
    removeStoreDroplet(widgetId, dropletId);
    addStoreDroplet(widgetId, dropletId, {
      id: dropletId,
      title: values.title ? values.title : "",
      url: values.url,
      type: values.type as "text" | "link" | "phone" | "email",
      placeholder: false,
    });
    updateSplat(id, { grid, content });
    setOpen(false);
  }

  return (
    <ShadDialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-background-widget py-8 w-5/6 h-fit">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            Legg til tekst
          </DialogTitle>
          <DialogDescription className="text-[14px]">
            Legg til teksten du har lyst på
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative pt-2">
              <div className="flex gap-6 py-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-64">
                      <FormLabel>Tittel (valgbar hvis lenke)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Legg til tittel..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-32">
                      <FormLabel>Type Droplet</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-white">
                          <SelectTrigger>
                            <SelectValue placeholder="Velg hva du har lyst på" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white cursor-pointer">
                          <SelectItem value="text">Tekst</SelectItem>
                          <SelectItem value="link">Lenke</SelectItem>
                          <SelectItem value="phone">Telefon</SelectItem>
                          <SelectItem value="email">Epost</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="pt-4 pb-6">
                  <FormLabel>
                    Legg til {titles.get(form.getValues().type)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Legg til her..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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

export default EditTextPopup;
