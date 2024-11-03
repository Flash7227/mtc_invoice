import SidebarItem from './sidebar-item';
import { House, Settings, Users , List, Gauge, ScanText } from 'lucide-react';

const items = [
    {url: "/home", name:"Үндсэн", icon: <House size={20} className='group-hover:text-white'/>},
    {url: "/dashboard", name:"Үзүүлэлт", icon: <Gauge size={20} className='group-hover:text-white'/>},
    {url: "/list", name:"Жагсаалт", icon: <List size={20} className='group-hover:text-white'/>},
    {url: "/users", name:"Ажилтан", icon: <Users  size={20} className='group-hover:text-white'/>},
    {url: "/settings", name:"Тохиргоо", icon: <Settings size={20} className='group-hover:text-white'/>}
]
const Sidebar = () => {
    return (
        <aside className="w-[0] hidden sm:block sm:w-[82px] bg-slate-800 text-[12px] text-muted-foreground">
            <ul className='mt-[46px]'>
                {
                    items.map((i:any, index:number)=>(
                        <SidebarItem data={i} key={index}/>
                    ))
                }
            </ul>
        </aside>
    );
}

export default Sidebar;