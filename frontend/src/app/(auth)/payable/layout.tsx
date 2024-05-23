"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Dialog } from "../../../components/organisms/Dialog";
import { Payable } from "./page";

const pagesWithDialog = ["/register", "/edit"];
const PayableLayout = ({ children }: any) => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<undefined | string>();

  const payableComponent = useMemo(() => <Payable />, []);

  useEffect(() => {
    setIsModalOpen(pagesWithDialog.find((page) => pathname.includes(page)));
  }, [pathname]);

  return (
    <>
      {isModalOpen && (
        <Dialog
          label="Criar pagavéis"
          title="Pagavéis"
          confirm="Cadastrar"
          cancel="Cancelar"
          dialogForm
        >
          {children}
        </Dialog>
      )}
      {payableComponent}
    </>
  );
};

export default PayableLayout;
