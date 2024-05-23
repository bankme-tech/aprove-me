import type { NextPage } from 'next';
import React from 'react';

import { ContentWrapper } from '@/components/layout/content-wrapper';
import { TopBar } from '@/components/layout/top-bar';
import { AppContextProvider } from '@/contexts/app-context-provider';
import { LeftBar } from '@/components/layout/left-bar';

interface Props {
  children?: React.ReactNode;
}

const RootLayout: NextPage = ({ children }: Props) => (
  <AppContextProvider>
    <TopBar />
    <LeftBar />
    <ContentWrapper>{children}</ContentWrapper>
  </AppContextProvider>
);

export default RootLayout;
