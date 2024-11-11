import { formatNumber } from "./helper";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const PostPaid = ({ data, postpaidRows, updatePostpaidRows }: any) => {
  const [charge, setCharge] = useState(postpaidRows.charge);
  const [selected, setSelected] = useState(postpaidRows.row);
  const [amount, setAmount] = useState(postpaidRows.amount);

  const toggleSelect = (row: any) => {
    if (row == selected) {
      setSelected(undefined);
    } else {
      setSelected(row);
      if(charge != "custom"){
        setAmount(row[charge]);
      }
    }
  };

  const changeCharge = (e: any) => {
    setAmount(e.value);
  };
  
  useEffect(() => {
    updatePostpaidRows(amount, selected, charge);
  }, [selected, charge, amount]);

  return (
    <div className="overflow-x-auto">
      <hr className="mt-2"></hr>
      <h5 className="py-2 text-muted-foreground text-sm">Дараа төлбөрт</h5>
      <RadioGroup defaultValue={charge} onValueChange={setCharge}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="endBalance" id="endBalance" />
          <Label htmlFor="endBalance" className="normal-case">
            Эцсийн.үлд
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="chargedAmt" id="chargedAmt" />
          <Label htmlFor="chargedAmt" className="normal-case">
            Төлөх дүн
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom" className="normal-case">
            Гараар оруулах
          </Label>
        </div>
      </RadioGroup>
      {charge == "custom" && (
        <Input
          placeholder="Дүн оруулах"
          type="string"
          className="mt-2"
          id="customInput"
          value={amount}
          onInput={(e) => {
            formatNumber(e, false);
            changeCharge(e.target);
          }}
        />
      )}
      <table className="table">
        <caption className="!caption-top">
          <span>Сонгогдсон мөр нэхэмжлэлд нэмэгдэнэ</span>
        </caption>
        <thead>
          <tr>
            <th className="w-[44px]"></th>
            <th>Огноо</th>
            <th>Эхний.үлд</th>
            <th>Төлөх дүн</th>
            <th>Залруулга (+)</th>
            <th>Залруулга (-)</th>
            <th>Төлөх дүн (НӨАТ орсон)</th>
            <th>Төлсөн дүн</th>
            <th>Эцсийн.үлд</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d: any, index: number) => (
            <tr
              key={index}
              onClick={() => toggleSelect(d)}
              className={`${d == selected && "bg-slate-50"}`}
            >
              <td className="!text-center overflow-hidden flex-none">
                <Checkbox
                  checked={d == selected ? true : false}
                  onCheckedChange={() => toggleSelect(d)}
                />
              </td>
              <td>{d["chargedMonth"]}</td>
              <td>{d["beginBalance"]}</td>
              <td>{formatNumber(d["chargedAmt"], true)}</td>
              <td>{d["positiveAdj"]}</td>
              <td>{d["negativeAdj"]}</td>
              <td>{formatNumber(d["total"], true)}</td>
              <td>{formatNumber(d["receivedAmt"], true)}</td>
              <td>{d["endBalance"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostPaid;
