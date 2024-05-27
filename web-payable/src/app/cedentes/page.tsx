import React from "react";
import AssignorList from "./(components)/assignor-list";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col justify-between p-12">
      <AssignorList />
    </div>
  );
}
