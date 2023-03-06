import { getSession, useSession } from "next-auth/react";
import Dashboard from "./home/dashboard";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <Dashboard session={session} />;
  }
}
