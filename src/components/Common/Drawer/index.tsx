import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ROUTES } from '@/constants';
import close from '@public/assets/common/close.svg';
import logo from '@public/images/logo.png';

interface DrawerProps {
  closeDrawerHandler: () => any;
  isOpen?: boolean;
}

const Drawer = ({ closeDrawerHandler, isOpen = false }: DrawerProps) => {
  const router = useRouter();
  const handleClickReTest = () => {
    router.push(ROUTES.HOME);
  };

  const shareMyResult = async () => {
    if (navigator.share) {
      const title = document.title;
      const url = document.location.href;
      navigator
        .share({
          title,
          url,
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
      alert(
        '공유하기를 지원하지 않는 브라우저입니다. 다른 브라우저에서 공유해주세요.'
      );
    }
  };

  return isOpen ? (
    <>
      <Overlay onClick={closeDrawerHandler} />
      <Container>
        <Header>
          <Image
            src={logo}
            alt="오맵땡"
            width={76}
            height={40}
            layout="fixed"
          />
          <CloseBtn onClick={closeDrawerHandler}>
            <Image src={close} alt="close" layout="fixed" />
          </CloseBtn>
        </Header>
        <ListContainer>
          <li onClick={handleClickReTest}>테스트 다시하기</li>
          <li onClick={shareMyResult}>내 맵레벨 공유하기</li>
          <li>
            <Link href={ROUTES.INQURY}>
              <a>문의하기</a>
            </Link>
          </li>
        </ListContainer>
      </Container>
    </>
  ) : (
    <></>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grey50};
  z-index: 2;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;

  & li {
    padding: 17px 0 16px 17.45px;
    text-align: left;
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 40px;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export default Drawer;
