/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/context/auth/use-auth";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const { auth } = useAuth();

    useEffect(() => {
      auth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
