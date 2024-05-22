'use client'

import AddAssignor from "@/components/assignor/AssignorAdd";
import EditAssignor from "@/components/assignor/AssignorEdit";
import AssignorHeader from "@/components/assignor/AssignorHeader";
import ListAssignor from "@/components/assignor/AssignorList";
import Header from "@/components/header/Header";
import { useState } from "react";

export default function Assignor() {
  const [selectedComponent, setSelectedComponent] = useState('list');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'list':
        return <ListAssignor />;
      case 'add':
        return <AddAssignor />;
      case 'edit':
        return <EditAssignor />;
      default:
        return <ListAssignor />;
    }
  };

  return (
    <div>
      <Header></Header>
      <AssignorHeader onSelect={setSelectedComponent}></AssignorHeader>
      <div className="flex justify-center items-center bg-gray-800">
      <div className={`rounded-lg shadow w-full ${selectedComponent !== 'list' ? 'sm:max-w-md' : ''}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}
