import PayableItemActions from "./PayableItemActions"

type Payable = {
    id: string
    value: number
    emissionDate: string
    assignorId: string
}

const PayableItem = ({ payable }: {
    payable: Payable
}) => {
    return (
        <div className="w-full flex items-center justify-between py-4">
            <p>{payable.value}</p>

            <PayableItemActions payable={payable} />
        </div>
    )
}

export default PayableItem;