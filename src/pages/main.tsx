import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { getUserQuery, User } from '@/api/user';
import { Header, Drawer } from '@/components/Common';
import { Category, ProfileCard } from '@/components/Main';
import { ROUTES } from '@/constants';
import { USER_LEVEL } from '@/types';
import drawer_navigator from 'public/assets/common/hamburger.svg';
import svg_0 from 'public/assets/Main/0.svg';
import svg_1 from 'public/assets/Main/1.svg';
import svg_2 from 'public/assets/Main/2.svg';
import svg_3 from 'public/assets/Main/3.svg';
import svg_random from 'public/assets/Main/random.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const UserLevelNumber: { [index: number]: USER_LEVEL } = {
  1: USER_LEVEL.맵찔이,
  2: USER_LEVEL.맵초보,
  3: USER_LEVEL.맵러버,
  4: USER_LEVEL.맵부심,
  5: USER_LEVEL.맵마스터,
};

const Main: NextPage = () => {
  const router = useRouter();
  const [drawerOpend, setDrawerOpend] = useState(false);
  const { data: user } = useQuery<User>(['getUser'], getUserQuery);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleDrawerOpen = () => setDrawerOpend(true);
  const hanldeDrawerClose = () => setDrawerOpend(false);

  const sliderSetting = {
    dots: true,
    arrows: false,
    beforeChange: (prev: number, next: number) => {
      setSlideIndex(next);
    },
    customPaging: (index: number) => (
      <ClickArea>
        <Dots index={index} slideIndex={slideIndex} />
      </ClickArea>
    ),
  };

  const handleClickRandom = useCallback(() => {
    router.push(ROUTES.RANDOM);
  }, [router]);

  const Random = useMemo(
    () => ({
      title: '뭐 먹을지 모르겠으면?',
      contents: [
        {
          textFirst: '랜덤 음식 뽑기',
          image: svg_random,
          color: '#E34B4B',
          onClick: handleClickRandom,
        },
      ],
      height: 104,
    }),
    [handleClickRandom]
  );

  const Recommend = useMemo(
    () => ({
      title: '오늘의 추천',
      contents: [
        {
          textFirst: '오늘의',
          textSecond: '추천 떡볶이',
          image: svg_0,
          color: '#FF5341',
          onClick: () => router.push(ROUTES.오늘의추천_떡볶이),
        },
        {
          textFirst: '오늘의',
          textSecond: '추천 라면',
          image: svg_1,
          color: '#EE726E',
          onClick: () => router.push(ROUTES.오늘의추천_라면),
        },
        {
          textFirst: '맵마스터들의',
          textSecond: '추천 BEST 5',
          image: svg_2,
          color: '#FF9654',
        },
        {
          textFirst: '오늘의',
          textSecond: '맛',
          image: svg_3,
          color: '#FFC56B',
          onClick: () => alert('준비중 입니다.'),
        },
      ],
    }),
    [router]
  );

  return (
    <>
      <Drawer closeDrawerHandler={hanldeDrawerClose} isOpen={drawerOpend} />
      <Header type="side">
        <h2>오맵땡</h2>
        <Image
          src={drawer_navigator}
          alt="drawer_navigator"
          layout="fixed"
          onClick={handleDrawerOpen}
        />
      </Header>
      <Container>
        {user ? (
          <>
            <ProfileCard level={UserLevelNumber[user.userLevel.level]} />
            <Category {...Recommend} />
            <Category {...Random} />
          </>
        ) : (
          <>
            <Slider {...sliderSetting}>
              {Object.values(USER_LEVEL).map((level) => (
                <ProfileCard level={level} key={level} />
              ))}
            </Slider>
            <CategoryList>
              <Category
                disabled
                disabledText={'레벨테스트 받으면 맞춤형 음식 추천이!'}
                title={Recommend.title}
                contents={Recommend.contents.slice(0, 2)}
              />
            </CategoryList>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 800;
  overflow: hidden;

  & > * {
    margin: 15px 0;
  }
  .slick-dots li {
    width: 9px;
  }
`;

const CategoryList = styled.div`
  margin: 0 11.5px;
`;

const ClickArea = styled.div`
  width: 20px;
  height: 10px;
`;

const Dots = styled.div<{ index: number; slideIndex: number }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ff5252;
  background-color: ${({ index, slideIndex }) =>
    index === slideIndex ? '#FF5252' : '#636366'};
`;

export default Main;
