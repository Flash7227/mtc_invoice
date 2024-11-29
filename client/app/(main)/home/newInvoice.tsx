"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import InfoForm from "./_new/infoForm";
import { useState, useEffect } from "react";
import useFetchWrapper from "@/utils/fetchWrapper";
import PrePaid from "./_new/prepaid";
import Other from "./_new/other";
import PostPaid from "./_new/postpaid";

const NewInvoice = (props: any) => {
  const { fetchWrapper } = useFetchWrapper();
  const [billType, setBillType] = useState<any>(["prepaid"]);
  const [prods, setProds] = useState<any>();
  const [prepaidRows, setPrepaidRows] = useState([]);
  const [postpaidRows, setPostpaidRows] = useState({
    amount: 0,
    row: undefined,
    charge: "endBalance",
  });
  const [other, setOther] = useState([]);
  const [otherRows, setOtherRows] = useState({
    product: "",
    price: 0,
    item: "",
    quantity: 0,
    total: 0,
  });

  useEffect(() => {
    const getProducts = async () => {
      const url = `/api/cust/products?custId=${props.custId}`;
      const response = await fetchWrapper(url);
      if (response["success"]) {
        setProds(response.data);
        createPrepaidRows(response.data.prepaid);
      }
    };
    const getOtherList = async () => {
      const url = `/api/payment/other`;
      const response = await fetchWrapper(url);
      if (response["success"]) {
        setOther(response.data);
      }
    };
    getProducts();
    getOtherList();
  }, []);

  const createPrepaidRows = (data: any) => {
    const temp = data.map((obj: any) => ({
      ...obj,
      bulkremains: "0",
      bulkmonth: "0",
    }));
    setPrepaidRows(temp);
  };
  const updatePostpaidRows = (amount: any, row: any, charge: any) => {
    if (charge == "custom" && amount) {
      if (typeof amount != "number") {
        amount = amount.replaceAll(",", "");
        amount = parseFloat(amount);
      }
    }
    if (charge != "custom" && row) {
      amount = row[charge];
    }
    setPostpaidRows({
      amount: amount,
      row: row,
      charge: charge,
    });
  };
  const updateOtherRows = (values: any) => {
    const name = values.target.name;
    const value = values.target.value;
    if (name == "product") {
      console.log(other[value]["amount"] + other[value]["vatAmt"]);
      setOtherRows({
        ...otherRows,
        product: value,
        item: other[value],
        quantity: 0,
        total: other[value]["amount"] + other[value]["vatAmt"],
        price: other[value]["amount"] + other[value]["vatAmt"],
      });
    } else if (name == "price") {
      setOtherRows({
        ...otherRows,
        total: value * otherRows.quantity,
        price: value,
      });
    } else if (name == "quantity") {
      setOtherRows({
        ...otherRows,
        quantity: value,
        total: value * otherRows.price,
      });
    }
  };
  const handleCalculate = async (values:any) => {
    const url = "/api/invoice/calculate";
    const options = {
      method:"POST",
      body: JSON.stringify({
        prepaid: values['bill_type'].includes('prepaid') ? getPrepaidInput(): null,
        postpaid: values['bill_type'].includes('postpaid') ? postpaidRows: null,
        other: values['bill_type'].includes('other') ? otherRows: null
      })
    };

    const response = await fetchWrapper(url,options);
    console.log(response);
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
  return (
    <Dialog
      open={props.custId ? true : false}
      onOpenChange={props.handleNewInvoiceClose}
    >
      <DialogContent className="max-w-[90%] max-h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>{props.custId} - шинэ нэхэмжлэл</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <InfoForm
          banks={props.banks}
          setBillType={setBillType}
          billType={billType}
          handleCalculate={handleCalculate}
        />
        <div>
          {prods && billType.includes("prepaid") && (
            <PrePaid data={prepaidRows} setPrepaidRows={setPrepaidRows} />
          )}

          {prods && billType.includes("postpaid") && (
            <PostPaid
              data={prods.postpaid}
              postpaidRows={postpaidRows}
              updatePostpaidRows={updatePostpaidRows}
            />
          )}

          {billType.includes("other") && (
            <Other
              data={other}
              otherRows={otherRows}
              updateOtherRows={updateOtherRows}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewInvoice;
