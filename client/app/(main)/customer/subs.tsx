import { useState } from "react";
import { formatDate } from "@/utils/helper";
import Paginator from "@/components/paginator";
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Subs = (props: any) => {
  const [expanded, setExpanded] = useState([""]);

  function ocsStatusName(raw: number) {
    if (raw == 1) {
      return "Active";
    } else if (raw == 11) {
      return "Active_1";
    } else if (raw == 3) {
      return "Grace";
    } else if (raw == 8) {
      return "Expired";
    } else if (raw == 15) {
      return "Treatment_suspend_1";
    } else if (raw == 16) {
      return "Treatment_suspend_2";
    } else if (raw == 19) {
      return "Cust_suspend";
    } else {
      return raw;
    }
  }
  function statusName(raw: string) {
    if (raw == "A") {
      return "Active";
    } else if (raw == "S") {
      return "Suspend";
    } else if (raw == "C") {
      return "Cancel";
    } else if (raw == "R") {
      return "Reserved";
    } else {
      return raw;
    }
  }
  function billTypeName(raw: string) {
    if (raw == "PPD") {
      return "Prepaid";
    } else if (raw == "PST") {
      return "Postpaid";
    } else {
      return raw;
    }
  }

  function toggleExpanded(event: any, cnvgId: any) {
    event.stopPropagation();
    const temp = expanded.includes(cnvgId)
      ? expanded.filter((i) => i !== cnvgId) // remove item
      : [...expanded, cnvgId]; // add item
    setExpanded(temp);
  }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">№</TableHead>
            <TableHead>Бүтээгдэхүүн №</TableHead>
            <TableHead>Гэрээ №</TableHead>
            <TableHead>Үйлчилгээ №</TableHead>
            <TableHead>Үндсэн тариф</TableHead>
            <TableHead>Төлбөрийн данс</TableHead>
            <TableHead>Төрөл</TableHead>
            <TableHead>Төлөв</TableHead>
            <TableHead>OCS Status</TableHead>
            <TableHead>Үүс.Огноо</TableHead>
            <TableHead>Шинэч.Огноо</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data ? (
            props.data["objects"].length > 0 ? (
              props.data["objects"].map((d: any, index: number) => (
                <TableRow
                  key={index}
                  className={
                    d["upper"] &&
                    (expanded.includes(d["upper"]) ? " table-row" : "hidden") +
                      " transition-transform"
                  }
                >
                  <TableCell className="text-muted-foreground text-xs">
                    {!d["upper"] &&
                      (props.data["pagination"]["page"] - 1) * 10 + 1 + index}
                  </TableCell>
                  <TableCell>
                    {d["cnvgId"] && (
                      <span
                        onClick={(e) => toggleExpanded(e, d["cnvgId"])}
                        className="border p-1 float-left mr-1 h-5 w-5 flex items-center hover:border-main-text hover:text-main-text"
                      >
                        {expanded.includes(d["cnvgId"]) ? (
                          <ChevronsDownUp size={14} />
                        ) : (
                          <ChevronsUpDown size={14} />
                        )}
                      </span>
                    )}{" "}
                    {d["subs"]["subsId"]}
                  </TableCell>
                  <TableCell>{d["subs"]["custId"]}</TableCell>
                  <TableCell>{d["subs"]["userId"]}</TableCell>
                  <TableCell>{d["subs"]["subsId"]}</TableCell>
                  <TableCell className="w-[200px]">
                    {d["subs"]["prodName"]}
                  </TableCell>
                  <TableCell>{d["subs"]["aceno"]}</TableCell>
                  <TableCell>{billTypeName(d["subs"]["billType"])}</TableCell>
                  <TableCell>{statusName(d["subs"]["status"])}</TableCell>
                  <TableCell className="uppercase">
                    {ocsStatusName(d["ocsState"])}
                  </TableCell>
                  <TableCell>
                    {formatDate(d["subs"]["createdAt"], true)}
                  </TableCell>
                  <TableCell>
                    {formatDate(d["subs"]["updatedAt"], true)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <td colSpan={12} className="!text-center text-muted-foreground">
                  Мэдээлэл байхгүй
                </td>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell
                colSpan={12}
                className="!text-center text-muted-foreground"
              >
                Мэдээлэл байхгүй
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end items-center py-2 text-sm">
        {props.data && (
          <Paginator
            data={props.data["pagination"]}
            changePage={props.changePage}
            loading={props.loading}
          />
        )}
      </div>
    </div>
  );
};

export default Subs;
