import { formatDate } from "@/utils/helper";
import { Input } from "@/components/ui/input";
import { checkInput, formatNumber } from "./helper";

const PrePaid = (props:any) => {
  const data = props.data;

  const changeInput = (event:any, row:any, type:any) => {
    props.setPrepaidRows((prevData:any) =>
      prevData.map((each:any) =>
        each == row ? { ...each, [type]: event.target.value } : each
      )
    );
  }
  return (
    <div className="overflow-x-auto">
       <h5 className="py-2 text-muted-foreground text-sm">Урьдчилсан төлбөрт</h5>
      <table className="table">
        {/* <caption className="!caption-top">Урьдчилсан төлбөрт</caption> */}
        <thead className="narrow">
          <tr>
            <th>Үйлчилгээний дугаар</th>
            <th>Үйлчилгээний нэр</th>
            <th>Дансны үлдэгдэл</th>
            <th>Дуусах огноо</th>
            <th>Суурь хураамж</th>
            <th>Сунгах сар</th>
            <th>Хэрэглээ</th>
          </tr>
        </thead>
        <tbody className="narrow">
          {data.map((d: any, index: number) => (
            <tr key={index}>
              <td>
                {d["subs"]["userId"]} {d["upper"]}
              </td>
              <td>{d["subs"]["prodName"]}</td>
              <td>{d["account"]["remains"]}</td>
              <td>
                {formatDate(d["account"]["lifecycle"]["accExpireAt"], true)}
              </td>
              <td>{d["recurring"]["monthlyFee"]}</td>
              <td>
                <Input
                  className="w-[80px]"
                  type="string"
                  onKeyDown={checkInput}
                  maxLength={2}
                  value={d['bulkmonth']}
                  onInput={(e)=>changeInput(e, d, 'bulkmonth')}
                  name={d["subs"]["userId"]}
                />
              </td>
              <td>
                {(d["subs"]["svcDomain"] == 1 ||
                  d["subs"]["svcDomain"] == 5) && (
                  <Input
                    className="w-[120px]"
                    type="string"
                    onKeyDown={checkInput}
                    maxLength={9}
                    value={d['bulkremains']}
                    onInput={(e)=>{formatNumber(e, false); changeInput(e, d, 'bulkremains')}}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrePaid;
