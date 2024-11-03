import { formatDate, InvStatus } from "@/utils/helper";
import Paginator from "@/components/paginator";
import { Checkbox } from "@/components/ui/checkbox";

const Invoices = (props:any) => {
    return (
        <div className="overflow-auto">
        <table className="table">
          <caption className="text-sm !normal-case">
            <div className="flex items-center justify-between">
              <div>Гэрээн дээр үүсгэсэн нэхэмжлэлүүд</div>
              <div className="flex justify-end text-[14px] text-slate-900">
                {props.data && (
                  <Paginator
                    data={props.data["pagination"]}
                    changePage={props.changeInvoicePage}
                    loading={props.loading}
                  />
                )}
              </div>
            </div>
          </caption>
          <thead>
            <tr>
              <th className="w-[40px]">№</th>
              <th>Гэрээ №</th>
              <th>Билл төрөл</th>
              <th>Нэр</th>
              <th>Дүн</th>
              <th>Төлсөн</th>
              <th>Илгээсэн огноо</th>
              <th>Ажилтан</th>
              <th>Төлөв</th>
            </tr>
          </thead>
          <tbody>
            {props.data ? (
              props.data["data"].map((invoice: any, index: number) => (
                <tr
                  key={index}
                  onClick={() => props.setSelected(invoice)}
                  className={`${props.selected == invoice && "bg-slate-50"}`}
                >
                  <td>
                    {props.selected == invoice ? (
                      <Checkbox
                        disabled
                        checked={props.selected == invoice ? true : false}
                      />
                    ) : (
                      (props.data["pagination"]["page"] - 1) *
                        props.data["pagination"]["nitem"] +
                      1 +
                      index
                    )}
                  </td>
                  <td>{invoice["CUST_ID"]}</td>
                  <td>{invoice["BILL_TYPE"]}</td>
                  <td>{invoice["NAME"]}</td>
                  <td>{invoice["TOTALAMOUNT"]}</td>
                  <td>{invoice["PAID_AMOUNT"]}</td>
                  <td>{formatDate(invoice["CREATED_AT"])}</td>
                  <td>{invoice["STAFF_ID"]}</td>
                  <td>{InvStatus(invoice["RESULT"], invoice["IS_CANCEL"], invoice["IS_PAID"])}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="!text-center text-muted-foreground">
                  Мэдээлэл байхгүй
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
}

export default Invoices;