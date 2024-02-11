import AssignorItemActions from "./AssignorItemActions"

interface AssignorItemProps {
    assignor: {
        id: string
        name: string
        document: string
        email: string
        phone: string
    }
}

const AssignorItem = (props: AssignorItemProps) => {

    const {assignor} = props;
    
    return (
        <div className="w-full flex items-center justify-between py-4">
            <p>{assignor.name}</p>

            <AssignorItemActions assignor={assignor} />
        </div>
    )
}

export default AssignorItem;