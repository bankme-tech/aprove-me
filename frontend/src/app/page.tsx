'use client';
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { NewAssignor } from "@/components/NewAssignor";
import { NewPayable } from "@/components/NewPayable";

import Image from "next/image";
import { Suspense} from "react";
import { withAuth } from "./auth/with-auth";


function Home() {

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Image src="/logo-bankme.png" alt="logo" width={100} height={100} className="mb-4" />
      <div className="flex p-4 gap-2">
        <NewPayable />
        <NewAssignor />
      </div>
      <div className="overflow-hidden">
        <Suspense fallback={<Loading/>}>
            <List />
        </Suspense>
         

      </div>
    </main>
  );
}

export default withAuth(Home);
