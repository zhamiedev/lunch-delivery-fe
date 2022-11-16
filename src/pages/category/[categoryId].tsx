import CategoryProduct from "components/category/product-list";
import ProductTab from "components/category/product-tab";
import CategoryTab from "components/category/tab";
import { useAppState } from "lib/context/app";
import { productFilters } from "lib/types/dummy-data";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Category() {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const categoryName = router.query.categoryId;
    const [activeTab, setActiveTab] = useState<string>(categoryName as string);
    const [productTab, setProductTab] = useState<string>(productFilters[0]);
    return (
        <div className="flex flex-col gap-y-2.5">
            <div className="bg-white rounded-2.5xl shadow-merchant-card flex flex-col gap-y-5 py-5">
                <div className="px-5">
                    <CategoryTab
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>
                <CategoryProduct />
            </div>
            <ProductTab activeTab={productTab} setActiveTab={setProductTab} />
        </div>
    );
}
