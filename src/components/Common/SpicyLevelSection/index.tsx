import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { SpicyLevelForm } from '@/components/Common';
import theme from '@/styles/theme';
import { LEVEL } from '@/types';

export interface SpicyLevelSectionProps {
  level?: LEVEL;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  transparent?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const SpicyLevelSection = ({
  level,
  transparent,
  children,
  ...props
}: SpicyLevelSectionProps) => {
  return (
    <Container transparent={transparent}>
      {children ? (
        children
      ) : (
        <DefaultHeeder>얼마나 맵게 느껴지나요?</DefaultHeeder>
      )}

      <SpicyLevelForm level={level} disabled={!!level} {...props} />
    </Container>
  );
};

const Container = styled.section<{ transparent?: boolean }>`
  margin: 0 16px;
  padding: 24px 0;
  background-color: ${({ transparent }) =>
    transparent ? `transparent` : theme.colors.background};
  border-radius: 14px;
`;
const DefaultHeeder = styled.h3`
  margin-bottom: 26px;
  font-weight: 800;
  font-size: 17px;
  color: ${theme.colors.white};
`;

export default SpicyLevelSection;
