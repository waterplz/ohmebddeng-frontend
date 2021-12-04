import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

export interface TabsProps<T> {
  tabs: T[];
  activeTab: T;
  onTabClick: (tab: T) => void;
}

export default function Tabs<T>({ tabs, activeTab, onTabClick }: TabsProps<T>) {
  const handleClickTab = (tab: T) => (e: React.MouseEvent) => {
    console.log(tab);
    onTabClick(tab);
  };

  return (
    <Container>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          active={tab === activeTab}
          onClick={handleClickTab(tab)}
        >
          {tab}
        </Tab>
      ))}
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
`;
const Tab = styled.button<{ active?: boolean }>`
  padding: 13px 0;
  flex: 1;
  color: ${({ theme }) => theme.colors.grey20};
  background-color: transparent;
  border: none;
  outline: none;

  ${({ theme, active }) =>
    active &&
    css`
      color: ${theme.colors.white};
      border-bottom: 2px solid ${theme.colors.red};
    `}
`;
