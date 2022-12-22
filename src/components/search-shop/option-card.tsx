import { useContext } from "react";

import CoffeeShopCard from "components/coffee-shop/card";
import LargeWhiteButton from "components/common/large-white-button";
import Office, { Merchant } from "lib/types/office.type";
import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";

interface OptionCardProps {
    office: Office;
}

const OptionCard: React.FC<OptionCardProps> = ({ office }) => {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();

    return (
        <button
            className="flex flex-wrap px-[15px] py-[15px]"
            onClick={() => {
                dispatch({
                    type: "merchants",
                    merchants: office.merchants,
                });
                dispatch({ type: "officeId", officeId: office._id });
                dispatch({
                    type: "officeName",
                    officeName: office.name,
                });

                dispatch({
                    type: "numberOfStorey",
                    numberOfStorey: office.number_of_storey,
                });
                router.push(`/office/${office._id}`);
            }}
        >
            <p className="mr-1 text-sm text-normal">{office.name}</p>
            <p className="text-sm font-light">
                ( {office.merchants.length} зоогийн газар )
            </p>
        </button>
    );
};

export default OptionCard;
