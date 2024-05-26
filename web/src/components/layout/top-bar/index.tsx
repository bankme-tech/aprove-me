'use client';

import { LogOut, PanelLeft } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { useAppContext } from '@/hooks/useAppContext';

export const TopBar: React.FC = () => {
  const { setIsLeftBarOpen, logout } = useAppContext();

  return (
    <header className="fixed flex h-12 w-screen items-center justify-between border-b border-b-zinc-800 bg-base-100 px-8 shadow-2xl">
      <button
        onClick={() => {
          setIsLeftBarOpen((prevState) => !prevState);
        }}
      >
        <PanelLeft size={20} />
      </button>

      <Image src="/bankme.png" alt="bankme logo" width={100} height={100} />

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="m-1">
          <Image
            width={32}
            height={32}
            alt="user placeholder"
            src="/user-placeholder.jpg"
            className="rounded-full"
          />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box border border-zinc-800 bg-base-100 p-2 shadow-lg shadow-black"
        >
          <li>
            <button className="text-red-500" onClick={logout}>
              <LogOut size={18} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};
