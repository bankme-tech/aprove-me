import React from "react";
import PayableList from "./(components)/payable-list";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center pt-10">
      <PayableList />
    </div>
  );
}
