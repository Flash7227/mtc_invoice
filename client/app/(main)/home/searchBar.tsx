"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "../../../components/ui/input";
import { Search, LoaderCircle} from 'lucide-react';

const formSchema = z.object({
    id: z.string(),
    type: z.string()
})


const SearchBar = (props:any) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            type: "userId"
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        props.handleSearch(values);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-1">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="min-w-[190px] bg-white">
                                            <SelectValue placeholder="Хайх төрөл сонгох"  />
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
                                    <div className="relative">
                                        <Input placeholder="Хайх..." {...field} className="bg-white pr-10" />
                                        <Button type="submit" className="absolute inset-y-0 right-0" size={"icon"} variant={"default"} disabled={props.isLoading}>
                                            {
                                                props.isLoading ? <LoaderCircle className="animate-spin"/> :  <Search />
                                            }
                                           
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </form>
            </Form>
        </div>
    );
}

export default SearchBar;