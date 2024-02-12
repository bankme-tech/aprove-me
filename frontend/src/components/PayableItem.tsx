import PayableItemActions from "./PayableItemActions"

interface PayableItemProps {
    payable: {
        id: string
        value: number
        emissionDate: Date
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
                <p>{payable.value}</p>
                <p>{payable.assignor.name}</p>
                <p>{payable.emissionDate.toString()}</p>
            </div>

            <PayableItemActions payable={payable} />
        </div>
    )
}

export default PayableItem;