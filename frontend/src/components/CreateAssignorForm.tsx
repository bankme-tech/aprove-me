import createAssignor from "@/actions/postAssignorAction";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: null
}

function CreateAssignorForm() {
  const [state, formAction] = useFormState(createAssignor, initialState);
  const { pending } = useFormStatus();
  const ref = useRef<HTMLFormElement>(null);

  return (
    <div className="flex flex-col items-center gap-2 border-2 rounded-xl p-4">
      <h1 className="text-3xl font-bold">Create Assignor</h1>
      <form
        ref={ref}
        className="flex flex-col gap-3"
        action={(formData: FormData) => {
          formAction(formData)
          ref.current?.reset()
        }}
      >
        <div className="flex flex-col">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="text-black border-2 border-black p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Document</label>
          <input
            type="text"
            name="document"
            className="text-black border-2 border-black p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="text-black border-2 border-black p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="text-black border-2 border-black p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500"
          aria-disabled={pending}
        >
          Create Assignor
        </button>
        <p>{state?.message}</p>
      </form>
    </div>
  )
}

export default CreateAssignorForm;
