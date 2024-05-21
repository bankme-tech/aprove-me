'use client'

import { useState } from "react";
import AddPayable from "./PayableAdd";
import DeletePayable from "./PayableDelete";
import EditPayable from "./PayableEdit";
import PayableHeader from "./PayableHeader"
import ListPayable from "./PayableList";

export default function Payable() {
  const [selectedComponent, setSelectedComponent] = useState('list');

  const renderComponent = () => {
    console.log('rodou')
    switch (selectedComponent) {
      case 'list':
        return <ListPayable />;
      case 'add':
        return <AddPayable />;
      case 'edit':
        return <EditPayable />;
      case 'remove':
        return <DeletePayable />;
      default:
        return <ListPayable />;
    }
  };

  return (
    <div>
      <PayableHeader onSelect={setSelectedComponent}></PayableHeader>
      <form>
        <div className="h-screen flex justify-center items-center bg-gray-800">
          <div className="bg-gray-200 rounded-lg shadow p-8 w-full sm:max-w-md">
            {renderComponent()}
          </div>
        </div>
      </form>
    </div>
  )
}