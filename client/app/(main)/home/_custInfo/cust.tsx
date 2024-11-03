"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const defaultState = {
  custId: "",
  taxId: "",
  certId: "",
  custName: "",
  contactNum1: "",
  contactNum2: "",
  email: "",
  personalId: "",
  custLevel: "",
  custType: "",
  subType: "",
  taxInc: "",
  address: "",
};

const Cust = (props: any) => {
  const [data, setData] = useState(defaultState);
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    } else {
      setData(defaultState);
    }
  }, [props.data]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div className="cust flex flex-col gap-3">
        <div className="flex items-center md:flex-row">
          <Label htmlFor="custId">Гэрээний дугаар</Label>
          <Input value={data["custId"]} readOnly />
        </div>
        <div className="flex items-center">
          <Label htmlFor="custName">Нэр</Label>
          <Input value={data["custName"]} readOnly />
        </div>
        <div className="flex items-center">
          <Label htmlFor="personalId">Регистр</Label>
          <Input value={data["personalId"]? data["personalId"] : ""} readOnly />
        </div>
        <div className="flex items-center">
          <Label htmlFor="certId">Гэрчилгээ №</Label>
          <Input value={data["certId"] ? data["certId"] : ""} readOnly />
        </div>
        <div className="flex items-center">
          <Label htmlFor="taxId">ТТД</Label>
          <Input value={data["taxId"] ? data["taxId"] : ""} readOnly />
        </div>
        <div className="flex items-center h-[32px]">
          <Label htmlFor="taxInc">НӨАТ төлөгч</Label>
          <Checkbox checked={data["taxInc"] == "1" ? true : false} disabled />
        </div>
      </div>
      {/* nextrow starts */}
      <div className="cust flex flex-col gap-3">
        <div className="flex items-center h-[32px]">
          <Label htmlFor="custLevel">Төрөл</Label>
          <RadioGroup
            value={
              data["custType"] == "GRP" ? data["subType"] : data["custType"]
            }
            disabled
            className="flex gap-2 items-center justify-center"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="PSN" id="PSN" />
              <Label
                htmlFor="PSN"
                className="text-muted-foreground font-normal !min-w-0"
              >
                Хувь
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="GOV" id="GOV" />
              <Label
                htmlFor="GOV"
                className="text-muted-foreground font-normal !min-w-0"
              >
                Төрийн байгууллага
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="BUS" id="BUS" />
              <Label
                htmlFor="BUS"
                className="text-muted-foreground font-normal !min-w-0"
              >
                Бизнес
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center">
          <Label htmlFor="custLevel">Ангилал</Label>
          <Input value={data["custLevel"]} readOnly />
        </div>
        <div className="flex items-center">
          <Label htmlFor="contactNum1">Гар утас</Label>
          <Input type="contactNum1" value={data["contactNum1"]} readOnly />
        </div>
        <div className="flex items-center">
          <Label htmlFor="contactNum2">Утас</Label>
          <Input
            value={data["contactNum2"] ? data["contactNum2"] : ""}
            readOnly
          />
        </div>
        <div className="flex items-center">
          <Label htmlFor="email">E-mail</Label>
          <Input value={data["email"] ? data["email"] : ""} readOnly />
        </div>
        <div className="flex items-center">
          <Label htmlFor="address">Хаяг</Label>
          <Textarea
            value={data["address"]}
            readOnly
            className="text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
};

export default Cust;
