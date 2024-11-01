import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Invoices = (props:any) => {
  return (
    <Table>
      <TableCaption>Хэрэглэгчийн гэрээн дээрх нэхэмжлэлүүд</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">№</TableHead>
          <TableHead>Гэрээ №</TableHead>
          <TableHead>Билл төрөл</TableHead>
          <TableHead>Нэр</TableHead>
          <TableHead>Дүн</TableHead>
          <TableHead>Төлсөн</TableHead>
          <TableHead>Илгээсэн огноо</TableHead>
          <TableHead>Ажилтан</TableHead>
          <TableHead>Төлөв</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Invoices;
