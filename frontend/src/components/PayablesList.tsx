import { BASE_URL } from "@/contants";
import PayableItem from "./PayableItem";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const PayablesList = async ({ token, router, showToast }: {
    token: string
    router: AppRouterInstance,
    showToast: (severity: string, summary: string, detail: string) => void
}) => {
    const res = await fetch(`${BASE_URL}/integrations/payable`, {
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

    console.log(data);

    return (
        <div className="w-full">
            {data.map((payable: any) => (
                <PayableItem key={payable.id} payable={payable} showToast={showToast}/>
            ))}
        </div>
    )
}

export default PayablesList;