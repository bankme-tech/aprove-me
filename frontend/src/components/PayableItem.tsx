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
    },
    showToast: (severity: string, summary: string, detail: string) => void
}

const PayableItem = (props: PayableItemProps) => {

    const {payable, showToast} = props;
    
    return (
        <div className="w-full flex items-center justify-between py-4">
            <div className="flex flex-col gap-1">
                <p>{currency(payable.value)}</p>
                <p>{payable.assignor.name}</p>
                <p>{formatDate(payable.emissionDate)}</p>
            </div>

            <PayableItemActions payable={payable} showToast={showToast}/>
        </div>
    )
}

export default PayableItem;