var moment = require("moment");

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatDate(date, short) {
  if (short) {
    return moment(date).format("YYYY/MM/DD");
  } else {
    return moment(date).format("YYYY/MM/DD HH:mm");
  }
}

export function sortObj(raw) {
  const ordered = Object.keys(raw)
    .sort()
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
  return ordered;
}

export function ocsStatus(raw) {
  if (raw == 1) {

  }
}

export async function returnInvoice(token, billid, date) {
  const url = `${process.env.API_URL}/invoice`;
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token}`);
  const body = {
    billid: billid,
    date: date,
  };
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: reqHeaders,
      body: JSON.stringify(body),
    });
    return response;
  } catch (e) {
    throw e;
  }
}

export const menus = [
  {
    id: "admin",
    label: "Админ",
  },
  {
    id: "settings",
    label: "Тохиргоо",
  },
  {
    id: "list",
    label: "Жагсаалт",
  },
  {
    id: "create",
    label: "Нэхэмжлэх үүсгэх",
  },
  {
    id: "cancel",
    label: "Буцаалт хийх",
  },
  {
    id: "returns",
    label: "Жагсаалт буцаалт",
  },
  {
    id: "stage",
    label: "Дараа төлбөрт уншуулах",
  },
  {
    id: "payment",
    label: "Төлбөр шивэлт",
  }
];


import { Badge } from "@/components/ui/badge"
export const InvStatus = (result, cancel, paid) => {
  if (cancel == "OK") {
    return <Badge variant={"secondary"}>Буцаасан</Badge>;
  } else if (result == "SUCCESS" && cancel != "OK" && paid != "OK") {
    if(paid == "HALF"){
      return <Badge variant={"default"}>Дутуу төлсөн</Badge>
    }else{
      return <Badge variant={"default"}>Төлөөгүй</Badge>
    }
  } else if (result == "SUCCESS" && cancel != "OK" && paid == "OK") {
    return <Badge variant={"success"}>Төлөгдсөн</Badge>
  } else if (result == "ERROR" && cancel != "OK") {
    return <Badge variant={"destructive"}>Алдаатай</Badge>
  } else if(result == null, cancel== null, paid == null){
    return <Badge variant={"wait"}>Хүлээгдэж байна</Badge>
  } else {
    return <Badge variant={"warning"}>{"Тодорхойгүй " + JSON.stringify({ result: result, cancel: cancel, paid: paid })}</Badge>
  }
}
