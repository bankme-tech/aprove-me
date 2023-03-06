import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (e) => {
    setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      ...authState,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        console.log("Login concluído", ok);
        router.push("/");
      } else {
        console.log(error);
      }
    });
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Aprove-me</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Sejam bem vindos ao sistema que irá te permitir controlar seu mini
            banco!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Ainda não está inscrito?</span>
            <Link href="signup">Inscreva-se já!</Link>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Login Bankmers 🚀
          </h3>
          <form
            action="#"
            className="flex flex-col space-y-5"
            onSubmit={handleAuth}
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                autoFocus
                onChange={handleFieldChange}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                onChange={handleFieldChange}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={handleAuth}
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
