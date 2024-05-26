import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { AppRoutes } from '@/constants/app-routes';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-20">
      <h1 className="text-4xl">Welcome to Bankme Payables</h1>

      <div className="flex gap-8">
        <Link
          href={AppRoutes.payables.index}
          className="mt-24 flex w-full max-w-sm flex-col gap-4 rounded-md border border-zinc-800 p-4 transition-all hover:bg-zinc-950"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Payables</h2>
            <ArrowRight />
          </div>
          <span>The easiest way to manage your payables</span>
        </Link>

        <Link
          href={AppRoutes.payables.index}
          className="mt-24 flex w-full max-w-sm flex-col gap-4 rounded-md border border-zinc-800 p-4 transition-all hover:bg-zinc-950"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Assignor</h2>
            <ArrowRight />
          </div>
          <span>Register your assignors</span>
        </Link>
      </div>
    </main>
  );
}
