import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import useFetchWrapper from "@/utils/fetchWrapper";
import { useLoading } from "@/app/LoadingContext";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Сонголт хийнэ үү!",
  }),
  account: z.string().min(1, {
    message: "Заавал сонгоно уу!",
  }),
});

const Create = (props: any) => {
  const { fetchWrapper } = useFetchWrapper();
  const { isLoading } = useLoading();
  const { toast } = useToast();
  const [calc, setCalc] = useState();
  const [postpaidRow, setPostpaidRow] = useState();
  const [postpaidCharge, setPostpaidCharge] = useState("");
  const [prepaidRows, setPrepaidRows] = useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: props.data["prepaid"].length > 0 ? ["prepaid"] : ["postpaid"],
      account: "",
    },
  });

  useEffect(() => {
    const addFieldsToPrepaid = () => {
      const temp = props.data["prepaid"].map((obj: any) => ({
        ...obj,
        bulkremains: "0",
        bulkmonth: "0",
      }));
      setPrepaidRows(temp);
    };
    addFieldsToPrepaid();
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let bank = data["account"];
    calcInputs(bank);
    // console.log(data);
  }

  function getPrepaidInput() {
    let temp = [];
    const changedRows = prepaidRows.filter((d:any)=>parseInt(d['bulkmonth']) > 0 || parseInt(d['bulkremains']) > 0);
    for(const item of changedRows){
      let each = item as any;
      const total = (parseInt(each['bulkmonth']) * each['recurring']['monthlyFee']) + parseInt(each['bulkremains'].replace(",", ""));
      temp.push({
        chargeOption:{},
        info:{
          recharge:{
            amount: total,
            numOfRecurring: parseInt(each['bulkmonth'])
          },
          userKey: each['subs']['userId'],
          subsId: each['subs']['subsId']
        },
        additional:{
          billType: 'PPD',
          amount: parseInt(each['bulkremains'].replace(",", "")),
          numOfRecurring: parseInt(each['bulkmonth']),
          userId: each['subs']['userId'],
          name: each['subs']['userId'],
          subsId: each['subs']['subsId'],
          svcDomain: each['subs']['svcDomain'],
          subDomain: each['subs']['subDomain'],
          fee: each['recurring']['monthlyFee'],
          discount : 0,
          chargedMonth: null,
          total:total
        }
      });
    }
    return temp;
  }

  const calcInputs = async (bank: any) => {
    let postpaid:any = [];
    let prepaid:any = [];

    if(form.getValues("items").includes("prepaid")){
      prepaid = getPrepaidInput();
    }
  
    if (form.getValues("items").includes("postpaid")) {
      if (postpaidRow) {
        const tempTotal =  postpaidCharge == "chargedAmt"
        ? parseFloat(postpaidRow["chargedAmt"])
        :  postpaidCharge == "custom" ? parseFloat((document.getElementById('customInput') as HTMLInputElement).value.replace(/,/g, '')) : parseFloat(postpaidRow["endBalance"] ); //endBalance,chargedAmt
        postpaid = [{
          amount:tempTotal,
          name:
            chargedMonth(postpaidRow["chargedMonth"]) +
            " " +
            postpaidRow["userId"],
          userId: postpaidRow["userId"],
          billType: "PST",
          chargedMonth: postpaidRow["chargedMonth"],
          discount: 0,
          numOfRecurring: 0,
          fee: 0,
          total: tempTotal
        }];
      }
    }
    if (prepaid.length == 0 && !postpaidRow) {
      toast({
        title: "Мэдээлэл",
        variant: "warning",
        description: "Сонголт хийгээгүй байна",
      });
    } else {
      const options = {
        method: "POST",
        body: JSON.stringify({
          cust: props.cust,
          billAcntId: props.data["billAcntId"],
          prepaid: prepaid,
          postpaid: postpaid,
          bank: bank,
        }),
      };
      const url = `/api/cust/calculate`;
      const response = await fetchWrapper(url, options);
      if (response) {
        setCalc(response["data"]);
      }
    }
  };

  const handleCalculatedClose = async () => {
    setCalc(undefined);
  };

  const getPostpaidInput = (row: any, charge: string) => {
    if (row) {
      setPostpaidRow(row);
      setPostpaidCharge(charge);
    } else {
      setPostpaidRow(undefined);
    }
  };
  const { watch } = form;

  return (
    <Dialog
      open={props.data ? true : false}
      onOpenChange={props.handleCreateClose}
    >
      <DialogContent className="max-w-[90%] max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Шинэ нэхэмжлэл</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {props.loading && "Уншиж байна ..."}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            // onChange={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem className="flex items-center flex-row gap-4 space-y-0">
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id} className="space-x-1">
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
            <div className="space-y-2 w-[400px]">
              <FormLabel>Төлөх данс</FormLabel>
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Данс</FormLabel> */}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Данс сонгох" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {props.accounts.map((acc: any, index: number) => (
                          <SelectItem value={acc.bankAccountNo} key={index}>
                            {acc.bankName} - {acc.bankAccountNo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit" disabled={isLoading}>
                Тооцох
              </Button>
            </div>
          </form>
        </Form>
        {watch("items").includes("prepaid") && (
          <PrePaid data={prepaidRows} setPrepaidRows={setPrepaidRows}/>
        )}
        {watch("items").includes("postpaid") && (
          <PostPaid
            data={props.data["postpaid"]}
            postpaidRow={postpaidRow}
            getPostpaidInput={getPostpaidInput}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Create;

const items = [
  {
    id: "prepaid",
    label: "Урьдчилсан төлбөрт",
  },
  {
    id: "postpaid",
    label: "Дараа төлбөрт",
  },
] as const;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Checkbox } from "@/components/ui/checkbox";
import { chargedMonth } from "./_create/helper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PrePaid from "./_create/prepaid";
import PostPaid from "./_create/postpaid";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

