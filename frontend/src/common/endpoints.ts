const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '/'

export const Endpoints = {
    LOGIN: `${baseUrl}integrations/auth`,
    NEW_ASSIGNOR: `${baseUrl}integrations/assignor`,
    LIST_ASSIGNORS: `${baseUrl}integrations/assignors`,
    LIST_ASSIGNOR_BY_ID: `${baseUrl}integrations/assignor`,
    LIST_PAYABLE_BY_ID: `${baseUrl}integrations/payable`,
    LIST_PAYABLES: `${baseUrl}integrations/payables`,
    NEW_PAYABLE: `${baseUrl}integrations/payable`,
    UPDATE_PAYABLE: `${baseUrl}integrations/payable`,
    DELETE_PAYABLE: `${baseUrl}integrations/payable`,
}