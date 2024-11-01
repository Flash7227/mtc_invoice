import { ScanText , User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b bg-primary">
      <div className="h-14 max-w-screen-2xl px-2 mx-auto flex justify-between text-sm">
        <Link href="/" className="flex items-center gap-1 text-slate-50">
          <ScanText  size={18} />
          <span className="font-semibold text-xs tracking-tight uppercase">{process.env.APP_NAME}</span>
        </Link>
        <div className="h-full flex gap-2 items-center text-slate-100">
          <ul className="h-full hidden sm:flex flex-row items-center">
            <Link href="/customer" className="hover:text-slate-50 h-full flex items-center px-2 hover:bg-blue-500 transition-colors">Хэрэглэгч</Link>
            <Link href="/list" className="hover:text-slate-50 h-full flex items-center px-2 hover:bg-blue-500 transition-colors">Жагсаалт</Link>
            <Link href="/users" className="hover:text-slate-50 h-full flex items-center px-2 hover:bg-blue-500 transition-colors">Ажилтан</Link>
            <Link href="/settings" className="hover:text-slate-50 h-full flex items-center px-2 hover:bg-blue-500 transition-colors">Тохиргоо</Link>
          </ul>
          <div className="h-full flex items-center relative group "><User size="14"/>Ulziibayar
          <ul className="hidden group-hover:block absolute top-full border bg-white z-10 min-w-full">
                <Link href="/logout" className="block p-2 text-red-500 transition-colors">Гарах</Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
