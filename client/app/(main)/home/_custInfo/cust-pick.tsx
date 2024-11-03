import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Paginator from "@/components/paginator";

const CustPick = (props: any) => {
  const [selected, setSelected] = useState();
  const handleCustPick = () => {
    props.handleCustPick(selected);
  };
  return (
    <Dialog
      open={props.data["objects"].length > 1 ? true : false}
      onOpenChange={props.handleCustPickClose}
    >
      <DialogContent className="max-w-[90%] max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Хэрэглэгчийн жагсаалт</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Гэрээний дугаар</th>
              <th>Төрөл</th>
              <th>Хэрэглэгчийн нэр</th>
              <th>Регистр</th>
              <th>Хаяг</th>
              <th>Гар утас</th>
              <th>Үйлчилгээний дугаар</th>
              <th>Төлөв</th>
            </tr>
          </thead>
          <tbody>
            {props.data["objects"].map((d: any, index: number) => (
              <tr
                key={index}
                onClick={() => setSelected(d)}
                className={`cursor-pointer ${
                  d == selected && "bg-slate-50 dark:text-black"
                }`}
              >
                <td className="min-w-[30px]">
                  <Checkbox
                    disabled
                    checked={d == selected ? true : false}
                  />
                </td>
                <td>{d["custId"]}</td>
                <td>{d["custType"]}</td>
                <td>{d["custName"]}</td>
                <td>{d["personalId"]}</td>
                <td>{d["address"]}</td>
                <td>{d["contactNum1"]}</td>
                <td>{d["userId"]}</td>
                <td>{d["status"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="relative flex justify-end items-center py-3 text-sm">
          {props.data && (
            <Paginator
              data={props.data["pagination"]}
              changePage={(e:any)=>{props.changePage(e); setSelected(undefined)}}
            />
          )}
        </div>
        <div className="flex justify-end">
          <Button onClick={handleCustPick} disabled={!selected ? true : false}>Зөвшөөрөх</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustPick;
