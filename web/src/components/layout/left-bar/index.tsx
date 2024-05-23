'use client';

import { HandCoins } from 'lucide-react';
import React from 'react';

import { useAppContext } from '@/hooks/use-app-context';
import { cn } from '@/utils/funcitons';

export const LeftBar: React.FC = () => {
  const { isLeftBarOpen } = useAppContext();

  return (
    <aside
      className={cn(
        isLeftBarOpen ? 'translate-x-0' : '-translate-x-full',
        'fixed top-12 flex h-[calc(100vh-48px)] w-64 justify-center border-r border-r-zinc-700 bg-base-300 shadow-2xl shadow-black transition-all',
      )}
    >
      <ul className="menu w-full bg-base-200">
        <li>
          <details open>
            <summary>
              <HandCoins size={18} /> Payables
            </summary>
            <ul>
              <li>
                <a>List</a>
              </li>
              <li>
                <a>Create</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  );
};
