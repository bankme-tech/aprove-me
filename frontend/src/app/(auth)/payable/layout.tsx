"use client";

import { PayableProvider } from "@/context/payable.context";
import { deleteOnePayable } from "@/services";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Dialog } from "../../../components/organisms/Dialog";
import { Payable } from "./page";

const pagesWithDialog = ["/register", "/edit", "/delete"];

const PayableLayout = ({ children }: any) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const id = searchParams.get("id") as string;

  const [isModalOpen, setIsModalOpen] = useState<undefined | string>();

  const payableComponent = useMemo(() => <Payable />, []);

  useEffect(() => {
    setIsModalOpen(pagesWithDialog.find((page) => pathname.includes(page)));
  }, [pathname]);

  return (
    <PayableProvider>
      {isModalOpen && (
        <Dialog
          {...(pathname !== "/payable/delete"
            ? {
                dialogForm: true,
                title: "Pagavéis",
                confirm: "Cadastrar",
                cancel: "Cancelar",
              }
            : {
                title: "Excluir Pagável",
                confirm: "Excluir",
                cancel: "Cancelar",
                onConfirm: async () => {
                  const res = await deleteOnePayable(id);

                  if (res instanceof Error) {
                    return;
                  }
                },
              })}
        >
          {children}
        </Dialog>
      )}
      {payableComponent}
    </PayableProvider>
  );
};

export default PayableLayout;
