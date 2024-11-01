import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar/>
            <main className="grow max-w-screen-2xl container mx-auto p-2">
              {children}
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;