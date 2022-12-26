import FoodBorder from "components/common/food-border";
import { useAppState } from "lib/context/app";
import { Category } from "lib/types/merchant-menu-category.type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CategoryCard({
    category,
    small = false,
    active = false,
}: {
    category: any;
    small?: boolean;
    active?: boolean;
}) {
    const { id, name, icon, logo } = category;
    const router = useRouter();
    const [state, dispatch]: any = useAppState();

    const onCategoryCardClick = async () => {
        if (!small) {
            await dispatch({ type: "categoryId", categoryId: id });
            router.push(`/category/${id}`);
        }
    };

    return (
        // <Link href={`/office/${router.query.officeId}/category/${title}`}>
        <div
            onClick={onCategoryCardClick}
            className="flex flex-col items-center gap-y-1.25"
        >
            <div
                className={
                    "relative overflow-hidden " +
                    (small ? "w-[55px] h-[55px]" : "w-[72.5px] h-[72.5px]")
                }
            >
                {small ? (
                    <>
                        <img
                            src={logo}
                            alt={logo}
                            width={55}
                            height={55}
                            className="rounded-md"
                        />
                        {active && <FoodBorder />}
                    </>
                ) : (
                    <>
                        <img
                            src={icon}
                            alt={icon}
                            width={72.5}
                            height={72.5}
                            className="rounded-md"
                        />
                    </>
                )}
            </div>
            <div
                className={
                    "text-xs " + (small && active ? "text-main" : "text-gray")
                }
            >
                {name}
            </div>
        </div>
        // </Link>
    );
}
