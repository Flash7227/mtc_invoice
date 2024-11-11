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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const formSchema = z.object({
  product: z.string(),
  price: z.coerce.number(),
  item: z.string().optional(),
  quantity: z.coerce.number(),
  total: z.coerce.number(),
});

const Other = (props: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: props.otherRows.product,
      price: props.otherRows.price,
      item: props.otherRows.item,
      quantity: props.otherRows.quantity,
      total: props.otherRows.total,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    values.item = props.data[values.product];
    console.log('triggered for nothing');
  }

  return (
    <div>
       <hr className="mt-2"></hr>
       <h5 className="py-2 text-muted-foreground text-sm">Бусад төлбөр</h5>
      {props.data && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={props.updateOtherRows}
            className="flex items-end gap-3"
          >
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Бараа</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="product"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Бараа сонгох" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {props.data.map((d: any, index: number) => (
                        <SelectItem key={index} value={index.toString()}>
                          <strong>{d.pymCdName}</strong>- {d.amount + d.vatAmt}{" "}
                          MNT
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Үнэ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      type="number"
                      value={props.otherRows.price}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ширхэг</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      type="number"
                      value={props.otherRows.quantity}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дүн</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      type="number"
                      readOnly
                      className="cursor-not-allowed"
                      value={props.otherRows.total}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
      )}
    </div>
  );
};

export default Other;
