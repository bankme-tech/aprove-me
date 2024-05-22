'use client';
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { NewPayable } from "@/components/NewPayable";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Image src="/logo-bankme.png" alt="logo" width={100} height={100} className="mb-4" />
      <div className="flex p-4">
        <NewPayable />
        <Button className="mx-2">New Assignor</Button>
      </div>
      <div className="overflow-hidden">
        <Suspense fallback={<Loading/>}>
            <List />
        </Suspense>
         

      </div>
    </main>
  );
}
