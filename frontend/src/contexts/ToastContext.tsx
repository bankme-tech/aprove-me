'use client';

import { Toast } from "primereact/toast";
import { ReactNode, createContext, useRef } from "react";

type ToastProviderValue = {
    showToast: (
        severity: string,
        summary: string,
        detail: string
    ) => void
}

export const ToastContext = createContext({} as ToastProviderValue);

export const ToastProvider = ({ children }: {
    children: ReactNode
}) => {
    const toastRef = useRef<any>();

    const showToast = (
        severity: string,
        summary: string,
        detail: string
    ) => {
        toastRef.current.show({ severity, summary, detail });
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toast ref={toastRef} />
            {children}
        </ToastContext.Provider>
    )
}