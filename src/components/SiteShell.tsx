"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // The Sanity Studio renders its own full-screen UI; don't wrap it
    // with the site header/footer (the fixed header overlaps the studio).
    if (pathname?.startsWith("/studio")) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
