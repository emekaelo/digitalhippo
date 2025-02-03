import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {cn} from "@/src/lib/utils";
import {Navbar} from "@/src/components/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className='h-full'>
        <body
            className={cn(geistSans.className, "antialiased relative h-full font-sans")}
        >
        <main className="relative flex flex-col min-h-screen">
            <Navbar />
            <div className='flex-grow flex-1'>
                {children}</div>
        </main>
        </body>
        </html>
    );
}
