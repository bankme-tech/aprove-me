import AssignorItemActions from "./AssignorItemActions"

interface AssignorItemProps {
    assignor: {
        id: string
        name: string
        document: string
        email: string
        phone: string
    },
    showToast: (severity: string, summary: string, detail: string) => void
}

const AssignorItem = (props: AssignorItemProps) => {

    const {assignor, showToast} = props;
    
    return (
        <div className="w-full flex items-center justify-between py-4">
            <p>{assignor.name}</p>

            <AssignorItemActions assignor={assignor} showToast={showToast}/>
        </div>
    )
}

export default AssignorItem;