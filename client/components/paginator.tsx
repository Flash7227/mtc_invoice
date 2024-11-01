import { ChevronLeft, ChevronRight } from 'lucide-react';

const Paginator = (props: any) => {
  const data = props.data;

  const calcPages = () => {
    const totalPages = Math.ceil(data["total"] / data["nitem"]);
    const temp = [];
    for (let i = 1; i <= totalPages; i++) {
      temp.push(i);
    }
    return totalPages > 1 && <div className="flex gap-1 items-center">
        <ChevronLeft size={20} className={`${data['page'] == 1 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:text-main-text`} onClick={()=>data['page'] != 1 && props.changePage(data['page'] - 1)}/>
        {
          temp.length < 5 ?  temp.map((d:number)=><div key={d} onClick={()=>props.changePage(d)} className={`${d == data['page'] && 'font-bold bg-blue-200 border border-main-hover text-main-text'} flex items-center justify-center w-6 h-6 hover:text-main-text cursor-pointer`}>{d}</div>)
          : data['page']
        }
        <ChevronRight size={20} className={`${data['page'] == totalPages ? 'cursor-not-allowed' : 'cursor-pointer'} hover:text-main-text`} onClick={()=>data['page'] != totalPages && props.changePage(data['page'] + 1)}/>
    </div>;
  };

  return (
    
    <div className={`flex gap-2 items-center ${props.loading === true && 'pointer-events-none'}`}>
      <div>Нийт : {data["total"]}</div>
      {calcPages()}
    </div>
  );
};

export default Paginator;
