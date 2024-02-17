import AssignorItemActions from "./AssignorItemActions"

type Assignor = {
    id: string
    name: string
    phone: string
    email: string
    document: string
}

const AssignorItem = ({ assignor }: {
    assignor: Assignor
}) => {
    return (
        <div className="w-full flex items-center justify-between py-4">
            <p>{assignor.name}</p>

            <AssignorItemActions assignor={assignor} />
        </div>
    )
}

export default AssignorItem;