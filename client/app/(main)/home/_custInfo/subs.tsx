import { useState, useEffect } from "react";
import { formatDate } from "@/utils/helper";
import Paginator from "@/components/paginator";
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";

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
      <table className="table">
        <thead>
          <tr>
            <th className="w-[20px]"></th>
            <th>Бүтээгдэхүүн №</th>
            <th>Гэрээ №</th>
            <th>Үйлчилгээ №</th>
            <th>Үйлчилгээ</th>
            <th>Үндсэн тариф</th>
            <th>Төлбөрийн данс</th>
            <th>Төрөл</th>
            <th>Төлөв</th>
            <th>OCS Status</th>
            <th>Үүс.Огноо</th>
            <th>Шинэч.Огноо</th>
          </tr>
        </thead>
        <tbody>
          {props.data ? (
            props.data["objects"].length > 0 ? (
              props.data["objects"].map((d: any, index: number) => (
                <tr
                  key={index}
                  className={
                    d["upper"] &&
                    (expanded.includes(d["upper"]) ? " table-row" : "hidden") +
                      " transition-transform"
                  }
                >
                  <td className="text-muted-foreground text-xs">{!d["upper"] && (props.data['pagination']['page'] - 1) * 10 + 1 +index}</td>
                  <td>
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
                  </td>
                  <td>{d["subs"]["custId"]}</td>
                  <td>{d["subs"]["userId"]}</td>
                  <td>{d["subs"]["subsId"]}</td>
                  <td className="w-[200px]">{d["subs"]["prodName"]}</td>
                  <td>{d["subs"]["aceno"]}</td>
                  <td>{billTypeName(d["subs"]["billType"])}</td>
                  <td>{statusName(d["subs"]["status"])}</td>
                  <td className="uppercase">{ocsStatusName(d["ocsState"])}</td>
                  <td>{formatDate(d["subs"]["createdAt"], true)}</td>
                  <td>{formatDate(d["subs"]["updatedAt"], true)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="!text-center text-muted-foreground">
                  Мэдээлэл байхгүй
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={12} className="!text-center text-muted-foreground">
                Мэдээлэл байхгүй
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
