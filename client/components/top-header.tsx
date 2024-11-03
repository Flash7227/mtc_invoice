import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { cookies } from 'next/headers'
import { ScanText } from "lucide-react";


const TopHeader = async () => {
    const cookieStore = await cookies();
    const username = cookieStore.get('INVOICE_USERNAME');
    return (
        <header className="border-b w-full bg-white">
            <div className="flex items-center w-full justify-between py-2 px-4">
                    <div className='flex items-center justify-center flex-row gap-2 text-primary'>
                        <ScanText size={20} className='text-primary' />
                        <span className='tracking-tight font-medium text-[13px] uppercase'>{process.env.APP_NAME}</span>
                    </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-1 border rounded-lg py-1 px-2 cursor-pointer">
                            <div className="text-[13px] flex flex-col">
                                <div className="text-slate-800 font-medium">{username?.value}</div>
                            </div>
                            <ChevronDown className="text-muted-foreground" size={20} strokeWidth={1} />
                        </div>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href="/logout">Гарах</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


        </header>
    );
}

export default TopHeader;