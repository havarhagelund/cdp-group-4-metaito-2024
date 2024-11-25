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
  name: z.string().min(2),
  title: z.string().min(1),
  image: z.string().min(1),
});

interface EditMemberPopupProps {
  widgetId: number;
  dropletId: number;
  children?: React.ReactNode;
}

const EditMemberPopup = ({
  widgetId,
  dropletId,
  children,
}: EditMemberPopupProps) => {
  const { id, content, grid, addStoreDroplet, removeStoreDroplet } =
    useSplatStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!grid || !content) throw new Error("Grid or content is missing");
    removeStoreDroplet(widgetId, dropletId);
    addStoreDroplet(widgetId, dropletId, {
      id: dropletId,
      name: values.name,
      role: values.title,
      image: values.image,
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
            Legg til medlem
          </DialogTitle>
          <DialogDescription className="text-[14px]">
            Legg til et nytt medlem i widget!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative pt-2">
              <div className="flex justify-between py-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-64">
                      <FormLabel>Legg til navn</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Legg til navn..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Legg til tittel</FormLabel>
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
              </div>
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="pt-4 pb-6">
                  <FormLabel>Url av medlemsbilde</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Legg til url av medlemsbilde..."
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

export default EditMemberPopup;
