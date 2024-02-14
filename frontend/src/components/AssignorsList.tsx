import { BASE_URL } from "@/contants";
import AssignorItem from "./AssignorItem";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const AssignorsList = async ({ token, router, showToast }: {
    token: string,
    router: AppRouterInstance,
    showToast: (severity: string, summary: string, detail: string) => void
}) => {
    const res = await fetch(`${BASE_URL}/integrations/assignor`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    const data = await res.json();

    if(data?.statusCode === 401) {
        router.push("/");
        return;
    }

    return (
        <div className="w-full">
            {data.map((assignor: any) => (
                <AssignorItem key={assignor.id} assignor={assignor} showToast={showToast}/>
            ))}
        </div>
    )
}

export default AssignorsList;