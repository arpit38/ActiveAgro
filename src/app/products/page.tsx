import { Suspense } from "react";
import ProductsContent from "@/components/ProductsContent";

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center pt-20">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
            }
        >
            <ProductsContent />
        </Suspense>
    );
}
