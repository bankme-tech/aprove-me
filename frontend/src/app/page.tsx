'use client';
import { Suspense, useState } from "react";
import { PayableList } from "../components/PayableList";
import CreatePayableForm from "../components/CreatePayableForm";
import CreateAssignorForm from "@/components/CreateAssignorForm";
import FormPicker from "@/components/FormPicker";
import { withAuth } from "@/lib/with-auth";

function Home() {
  const [showPayable, setShowPayable] = useState(true);

  const toggleForm = () => {
    setShowPayable(!showPayable);
  }

  return (
    <div className="flex flex-col justify-center items-center my-4 gap-12">
      <div className="flex flex-col gap-4">
        <FormPicker showPayable={showPayable} setShowPayable={toggleForm} />
        {showPayable ? <CreatePayableForm /> : <CreateAssignorForm />}
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <PayableList />
      </Suspense>
    </div>
  );
}

export default withAuth(Home);
