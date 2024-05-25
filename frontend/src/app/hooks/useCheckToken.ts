import { JwtPayload, jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const getIsTokenExpired = (expDate: number) => {
  const MILLISECONDS_PER_SECOND = 1000;
    return new Date() > new Date(expDate * MILLISECONDS_PER_SECOND);
}

function useCheckToken() {
  const { push } = useRouter();
  const pathname = usePathname()
  useEffect(() => {
    const token = localStorage.getItem("BANKME_TOKEN");
    if (token) {
      const { exp } = jwtDecode<JwtPayload>(token);
      const isTokenExpired = getIsTokenExpired(exp as number);
      if (isTokenExpired) {
        localStorage.removeItem("BANKME_TOKEN");
        push("/");
      } else if (!isTokenExpired && pathname === '/') {
        push("register-payable")
      }
    } else {
      push("/");
    }
  }, []);
}

export default useCheckToken;
