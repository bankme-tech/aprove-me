import type { NextPage } from 'next';
import React from 'react';

import { ContentWrapper } from '@/components/layout/content-wrapper';
import { LeftBar } from '@/components/layout/left-bar';
import { TopBar } from '@/components/layout/top-bar';

interface Props {
  children?: React.ReactNode;
}

const RootLayout: NextPage = ({ children }: Props) => (
  <>
    <TopBar />
    <LeftBar />
    <ContentWrapper>{children}</ContentWrapper>
  </>
);

export default RootLayout;
