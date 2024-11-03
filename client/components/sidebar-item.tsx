'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link";
import clsx from 'clsx';

const SidebarItem = (props: any) => {
    const pathname = usePathname();
    return (
        <Link href={props.data.url}
            className={clsx(`px-2 group flex flex-col gap-1 items-center justify-center h-[82px] hover:bg-slate-700 transition-colors relative before:content-[''] before:absolute before:border-slate-200 before:left-0 hover:before:border-l-2 before:h-full before:transition-colors`,
                {
                    "bg-slate-700 before:border-l-2  text-slate-100": pathname == props.data.url
                },
                {
                    ":before:border-transparent": pathname != props.data.url
                }
            )}>
            {props.data.icon}
            <span className="text-center group-hover:text-slate-100 tracking-tight">{props.data.name}</span>
        </Link>
    );
}

export default SidebarItem;