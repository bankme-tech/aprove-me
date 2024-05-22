'use client'

import Header from "@/components/header/Header";
import { useState } from "react";
import AddPayable from "@/components/payable/PayableAdd";
import DeletePayable from "@/components/payable/PayableDelete";
import EditPayable from "@/components/payable/PayableEdit";
import PayableHeader from "@/components/payable/PayableHeader"
import ListPayable from "@/components/payable/PayableList";

export default function Payable() {
  const [selectedComponent, setSelectedComponent] = useState('list');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'list':
        return <ListPayable />;
      case 'add':
        return <AddPayable />;
      case 'edit':
        return <EditPayable />;
      case 'del':
        return <DeletePayable />;
      default:
        return <ListPayable />;
    }
  };

  return (
    <div>
      <Header></Header>
      <PayableHeader onSelect={setSelectedComponent}></PayableHeader>
      <div className="flex justify-center items-center bg-gray-800">
      <div className={`rounded-lg shadow w-full ${selectedComponent !== 'list' ? 'sm:max-w-md' : ''}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}
