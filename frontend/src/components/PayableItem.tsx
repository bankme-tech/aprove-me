import { currency } from "@/helpers/currency"
import PayableItemActions from "./PayableItemActions"
import { formatDate } from "@/helpers/format-date"

interface PayableItemProps {
    payable: {
        id: string
        value: number
        emissionDate: string
        assignorId: string
        assignor: {
            name: string
        }
    }
}

const PayableItem = (props: PayableItemProps) => {

    const {payable} = props;
    
    return (
        <div className="w-full flex items-center justify-between py-4">
            <div className="flex flex-col gap-1">
                <p>{currency(payable.value)}</p>
                <p>{payable.assignor.name}</p>
                <p>{formatDate(payable.emissionDate)}</p>
            </div>

            <PayableItemActions payable={payable} />
        </div>
    )
}

export default PayableItem;