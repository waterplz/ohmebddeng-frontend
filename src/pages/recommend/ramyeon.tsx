import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { getFoods } from '@/api/food';
import { Header } from '@/components/Common';
import FoodList from '@/components/Common/FoodList';
import Tabs from '@/components/Common/Tabs';
import { ROUTES } from '@/constants';
import { Food, USER_LEVEL } from '@/types';

export default function Ramyeon() {
  const router = useRouter();
  const [level, setLevel] = useState<USER_LEVEL>(USER_LEVEL.맵찔이);
  const { data: foods } = useQuery<Food[]>(['getFoods'], () =>
    getFoods({ category: '라면' })
  );

  const handleClickTab = (level: USER_LEVEL) => {
    setLevel(level);
  };

  const handleClickFood = useCallback(
    (foodId: string) => () => {
      router.push(`${ROUTES.FOOD_DETAIL}/${foodId}`);
    },
    [router]
  );

  return (
    <div>
      <Header type="center" showBackButton>
        오늘의 추천 떡볶이
      </Header>

      <Wrapper>
        <Tabs
          tabs={Object.values(USER_LEVEL)}
          activeTab={level as USER_LEVEL}
          onTabClick={handleClickTab}
        />
      </Wrapper>

      <FoodList foods={foods} onClickFood={handleClickFood} />
    </div>
  );
}

const Wrapper = styled.div`
  padding: 0 16px;
`;
