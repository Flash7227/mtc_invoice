import TopHeader from "@/components/top-header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex flex-row bg-slate-50">
      <Sidebar />
      <div className="w-full flex flex-col">
        <TopHeader />
        <main className="grow p-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;