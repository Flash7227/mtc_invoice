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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
const bill_types = [
  {
    id: "prepaid",
    label: "Урьдчилсан төлбөрт",
  },
  {
    id: "postpaid",
    label: "Дараа төлбөрт",
  },
  {
    id: "other",
    label: "Бусад төлбөр",
  },
] as const;

const formSchema = z.object({
  bank: z.string().min(2, {
    message: "Төлөх дансыг сонгоно уу.",
  }),
  bill_type: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Нэхэмжлэлийн төрөл сонгоно уу.",
  }),
});

const InfoForm = (props: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank: "",
      bill_type: props.billType,
    },
  });
  const { watch } = form
  const watchBillType = watch("bill_type");
  useEffect(()=>{
    props.setBillType(watchBillType);
  },[watchBillType]);
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    props.handleCalculate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 bg-slate-50 border p-2 rounded-md">
        <FormField
          control={form.control}
          name="bill_type"
          render={() => (
            <FormItem className="flex items-center space-y-0 gap-4">
              {bill_types.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="bill_type"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-1 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank"
          render={({ field }) => (
            <FormItem className="max-w-[400px]">
              {/* <FormLabel>Email</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Төлбөр төлөх данс" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {props.banks.map((bank: any, index: number) => (
                    <SelectItem key={index} value={bank["bankAccountNo"]}>
                      {bank["bankName"]}-{bank["bankAccountNo"]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Тооцоолох</Button>
      </form>
    </Form>
  );
};

export default InfoForm;
