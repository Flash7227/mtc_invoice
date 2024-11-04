"use client"
import { useState, useEffect } from "react";
import useFetchWrapper from "@/utils/fetchWrapper";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PrePaid from "./_new/prepaid";
import PostPaid from "./_new/postpaid";

const NewInvoice = (props: any) => {
    const { fetchWrapper } = useFetchWrapper();
    const [prods, setProds] = useState<any>();
    const [prepaidRows, setPrepaidRows] = useState([]);
    const [postpaidRows, setPostpaidRows] = useState({
        amount: 0,
        row: undefined,
        charge: "endBalance"
    });
    const [others, setOthers] = useState();

    useEffect(() => {
        const getProducts = async () => {
            const url = `/api/cust/products?custId=${props.custId}`;
            const response = await fetchWrapper(url);
            if (response["success"]) {
                setProds(response.data);
                createPrepaidRows(response.data.prepaid);
            }
        }
        const getOtherList = async () => {
            const url = `/api/payment/other`;
            const response = await fetchWrapper(url);
            if (response["success"]) {
                setOthers(response.data);
            }
        }
        getProducts();
        getOtherList();
    }, []);
    const createPrepaidRows = (data:any) => {
        const temp = data.map((obj: any) => ({
          ...obj,
          bulkremains: "0",
          bulkmonth: "0",
        }));
        setPrepaidRows(temp);
      };
    const updatePostpaidRows = (amount:any, row:any, charge:any) => {
        if(charge =="custom" && amount){
            amount = amount.replace(",", "");
            amount = parseFloat(amount);
        }
        if(charge != "custom" && row){
            amount = row[charge];
        }
        setPostpaidRows({
            amount: amount,
            row: row,
            charge: charge
        });
        console.log(amount, row, charge);
    }
    return (
        <Dialog open={props.custId} onOpenChange={props.handleNewInvoiceClose}>
            <DialogContent className="max-w-[90%] max-h-[90%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{props.custId} - Шинэ нэхэмжлэл</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Tabs defaultValue="prepaid">
                        <TabsList>
                            <TabsTrigger value="prepaid">Урьдчилсан төлбөрт</TabsTrigger>
                            <TabsTrigger value="postpaid">Дараа төлбөрт</TabsTrigger>
                            <TabsTrigger value="other">Бусад төлбөр</TabsTrigger>
                        </TabsList>
                        <TabsContent value="prepaid">
                            {
                                prods &&  <PrePaid data={prepaidRows} setPrepaidRows={setPrepaidRows}/>
                            }
                        </TabsContent>
                        <TabsContent value="postpaid">{
                             prods &&   <PostPaid data={prods.postpaid} postpaidRows={postpaidRows} updatePostpaidRows={updatePostpaidRows}/>}</TabsContent>
                        <TabsContent value="other">Change your password here.</TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default NewInvoice;