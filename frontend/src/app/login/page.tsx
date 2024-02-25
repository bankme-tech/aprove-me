'use client';
import login from "@/actions/loginAction";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
}

function LoginPage() {
  const [state, formAction] = useFormState(login, initialState)

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        action={formAction}
        className="flex flex-col gap-4 border-2 border-blue-500 px-5 py-8 rounded-xl"
      >
        <div className="flex flex-col">
          <label htmlFor="login" className="font-bold text-xl">Login</label>
          <input
            type="text" name="login" id="login"
            className="text-black border-2 border-blue-500 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold text-xl">Password</label>
          <input
            type="text" name="password" id="password"
            className="text-black border-2 border-blue-500 p-2 rounded-md"
          />
        </div>
        <p>{state.message}</p>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default LoginPage;
