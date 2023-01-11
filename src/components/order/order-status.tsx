import { Status } from "lib/types/order.type";

interface OrderStatusProps {
    status: string;
    alignRight?: boolean;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status, alignRight }) => (
    <div
        className={`text-sm font-light text-gray${alignRight && " text-right"}`}
    >
        {status === Status.NEW
            ? "Төлбөр хүлээгдэж буй"
            : status === Status.ACCEPTED
            ? "Захиалагдсан"
            : status === Status.PREPARING
            ? "Бэлтгэж байна"
            : status === Status.PREPARED
            ? "Бэлэн болсон"
            : status === Status.DELIVERING
            ? "Хүргэлтэнд гарсан"
            : status === Status.DELIVERED
            ? "Хүргэгдсэн"
            : status === Status.CANCELLED
            ? "Цуцлагдсан"
            : status === Status.COMPLETED
            ? "Дууссан"
            : ""}
    </div>
);

export default OrderStatus;
