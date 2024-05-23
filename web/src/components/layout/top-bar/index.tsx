'use client';

import { PanelLeft } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { useAppContext } from '@/hooks/useAppContext';

export const TopBar: React.FC = () => {
  const { setIsLeftBarOpen } = useAppContext();

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

      <div />
    </header>
  );
};
