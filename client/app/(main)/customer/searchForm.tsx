"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  id: z.string(),
  type: z.string({
    required_error: "Заавал сонгоно уу!.",
  }),
});

const SearchForm = (props: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "userId",
      id: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    props.handleSearch(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:w-fit flex flex-col md:flex-row gap-2"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="min-w-[190px] dark:bg-slate-800">
                    <SelectValue placeholder="Хайлтын төрөл" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="userId">Үйлчилгээний дугаар</SelectItem>
                  <SelectItem value="custId">Гэрээний дугаар</SelectItem>
                  <SelectItem value="taxId">ТТД</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="min-w-[300px]"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={props.isLoading}>
          Хайх
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
