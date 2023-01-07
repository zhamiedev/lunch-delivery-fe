import { useState } from "react";

import { useAppState } from "lib/context/app";
import { Add, HomeIcon, Remove } from "components/icons";
import { formatPrice } from "lib/utils/helpers";
import TokiAPI from "lib/api/toki";
import CenteredSpin from "components/common/centered-spin";

export function CartItems({
    items,
    totalAmount,
    setTotalAmount,
    taxAmount,
    setTaxAmount,
    grandTotal,
    setGrandTotal,
    setDiscountAmount,
    setData,
    loading,
    setLoading,
}: any) {
    const [state, dispatch]: any = useAppState();
    // const [loading, setLoading] = useState(false);

    const itemIncDecHandler = async (
        orderId: any,
        id: any,
        quantity: any,
        type: any
    ) => {
        const productData = {
            orderId: orderId,
            itemId: id,
            quantity: type == "increment" ? quantity + 1 : quantity - 1,
        };

        setLoading(true);

        try {
            const { data } = await TokiAPI.updateCard(
                state.officeId,
                productData
            );

            setData(data);
            data.totalAmount && setTotalAmount(data.totalAmount);
            data.taxAmount && setTaxAmount(data.taxAmount);
            data.grandTotal && setGrandTotal(data.grandTotal);
            data.discountAmount && setDiscountAmount(data.discountAmount);
            data.totalItems &&
                dispatch({ type: "cartCount", cartCount: data.totalItems });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 text-sm bg-white rounded-2xl shadow-delivery my-col-20">
            {items && Object.keys(items).length > 0 ? (
                <>
                    <div className="my-col-20">
                        {items?.map((place: any) => {
                            return (
                                <div
                                    key={place.merchant}
                                    className="pb-5 border-b border-dashed my-col-10 border-gray last:border-solid"
                                >
                                    <div className="flex items-center gap-x-2.5">
                                        <HomeIcon />
                                        <div className="font-medium truncate text-ellipsis">
                                            {place.merchant}
                                        </div>
                                    </div>

                                    {place.items.map((product: any) => {
                                        return (
                                            <div
                                                key={product.name}
                                                className="flex items-start justify-between"
                                            >
                                                <div className="my-col-5">
                                                    <div>{product.name}</div>

                                                    {product.options &&
                                                    Object.keys(product.options)
                                                        .length > 0 ? (
                                                        product.options.map(
                                                            (
                                                                option: any,
                                                                index: number
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        className="w-full font-light truncate text-gray "
                                                                        key={
                                                                            option.name
                                                                        }
                                                                    >
                                                                        {
                                                                            option.name
                                                                        }
                                                                        {index +
                                                                            1 ==
                                                                            Object.keys(
                                                                                product.options
                                                                            )
                                                                                .length &&
                                                                        product.comment
                                                                            ? ` (${product.comment})`
                                                                            : null}
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : product.comment ? (
                                                        <div className="font-light truncate text-gray line-clamp-1">
                                                            {`(${product.comment})`}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="flex flex-col items-end gap-y-1.25">
                                                    <div>
                                                        {formatPrice(
                                                            product.quantity *
                                                                product.price
                                                        )}{" "}
                                                        ₮
                                                    </div>

                                                    <div className="flex bg-[#F5F5FA] rounded-md px-0.5 py-[1px] text-sm font-light gap-x-2.5">
                                                        <button
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                itemIncDecHandler(
                                                                    place.id,
                                                                    product.id,
                                                                    product.quantity,
                                                                    "decremment"
                                                                )
                                                            }
                                                            disabled={loading}
                                                        >
                                                            <Remove
                                                                disabled={
                                                                    loading
                                                                }
                                                            />
                                                        </button>

                                                        {product.quantity}

                                                        <button
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                itemIncDecHandler(
                                                                    place.id,
                                                                    product.id,
                                                                    product.quantity,
                                                                    "increment"
                                                                )
                                                            }
                                                            disabled={loading}
                                                        >
                                                            <Add
                                                                disabled={
                                                                    loading
                                                                }
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="my-col-10">
                            <div>Захиалгын дүн:</div>
                            <div>Хүргэлтийн төлбөр:</div>
                            <div className="font-medium">Нийт төлөх:</div>
                        </div>

                        <div className="flex flex-col items-end gap-y-2.5">
                            <div>{formatPrice(totalAmount)} ₮</div>
                            <div>{formatPrice(taxAmount)} ₮</div>
                            <div className="font-medium">
                                {formatPrice(grandTotal)} ₮
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                "Сагс хоосон байна"
            )}
        </div>
    );
}
