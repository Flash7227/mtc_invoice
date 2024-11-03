import type { Metadata } from "next";
import { inter } from "@/components/ui/fonts";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import "@/style/globals.css";
import LoadingProvider from "./LoadingContext";

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader color="#b0d3ff" height={2} showSpinner={false}/>
        <LoadingProvider>
        {children}
        </LoadingProvider>
        <Toaster />
      </body>
    </html>
  );
}
