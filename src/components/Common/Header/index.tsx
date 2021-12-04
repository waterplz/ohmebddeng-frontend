import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import backArrowIcon from '@public/assets/common/chevron_back.svg';

interface HeaderProps {
  type: 'center' | 'side';
  children: React.ReactNode;
  showBackButton?: boolean;
}

const Header = ({ type, children, showBackButton }: HeaderProps) => {
  const router = useRouter();

  const handleClickBackButton = useCallback(() => {
    router.back();
  }, [router]);

  const headerType = {
    center: (
      <CenterContainer>
        {showBackButton && (
          <BackArrowIconContainer onClick={handleClickBackButton}>
            <Image src={backArrowIcon} width={24} height={24} alt="" />
          </BackArrowIconContainer>
        )}
        {children}
      </CenterContainer>
    ),
    side: <SideContainer>{children}</SideContainer>,
  };
  return headerType[type];
};

const CenterContainer = styled.header`
  position: relative;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 800;
  line-height: 23.8px;
`;
const BackArrowIconContainer = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
  cursor: pointer;
`;
const SideContainer = styled.header`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  & img {
    cursor: pointer;
  }
`;

export default Header;
