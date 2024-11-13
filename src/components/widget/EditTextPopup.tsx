"use client";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useState } from "react"
import { useSplatStore } from "@/store/Splat";

const formSchema = z.object({
  title: z.string().min(0),
  url: z.string().min(1),
  type: z.string().min(0),
})

interface EditTextPopupProps {
  widgetId: number;
  dropletId: number;
  children?: React.ReactNode
}

const EditTextPopup = ({ widgetId, dropletId, children }: EditTextPopupProps) => {
  const { updateStoreDroplet } = useSplatStore();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const titles = new Map([
    ["text", "Subtitle"],
    ["link", "Url"],
    ["phone", "Phone Number"],
    ["email", "Email Address"],
  ])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      type: "text",
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateStoreDroplet(widgetId, dropletId, {
      id: dropletId,
      title: values.title,
      url: values.url,
      type: values.type as "text" | "link" | "phone" | "email",
      placeholder: false,
    });
  }

  return (
    <ShadDialog>
      <DialogTrigger asChild>
        <button className="w-full">
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="bg-background-widget py-8 w-5/6 h-fit">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Text Droplet</DialogTitle>
          <DialogDescription className="text-[14px]">
            Add the content of your choice
          </DialogDescription>
        </DialogHeader>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="relative pt-2">
              <div className="flex gap-6 py-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-64">
                      <FormLabel>Title (optional if link)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Insert title here..." {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-32">
                      <FormLabel>Type of Droplet</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="bg-white">
                          <SelectTrigger>
                            <SelectValue placeholder="Select your preferred type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white cursor-pointer">
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="link">Link</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
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
                  <FormLabel>Insert {titles.get(form.getValues().type)}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Insert here..." {...field} />
                  </FormControl>
                </FormItem>
              )} />
            <DialogFooter className="py-2">
              <div className="flex w-full justify-between items-center">
                <p className="text-error-default">{error}</p>
                <Button type="submit" className="bg-primary-second text-md text-white">Edit Widget</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent >
    </ShadDialog >
  )
}

export default EditTextPopup;
