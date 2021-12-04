import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { getFoods } from '@/api/food';
import { Header } from '@/components/Common';
import FoodList from '@/components/Common/FoodList';
import { ROUTES } from '@/constants';
import { Food, TASTE_LEVEL } from '@/types';
import arrow_under from '@public/assets/common/arrow_under.svg';

const CategoryByTaste: NextPage = () => {
  const router = useRouter();
  const { level } = router.query;
  const [category, setCategory] = useState<string | undefined>(undefined);

  const { data: foods } = useQuery<Food[]>(
    ['getFoods', category, level],
    () => getFoods({ category, hotLevel: level as TASTE_LEVEL }),
    { enabled: !!level, useErrorBoundary: true }
  );

  const handleClickTab = useCallback(
    (level: TASTE_LEVEL) => () => {
      router.push(`${ROUTES.CATEGORY}/${level}`);
    },
    [router]
  );

  const handleChangeCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.target.value);
    },
    []
  );

  const handleClickFood = useCallback(
    (foodId: string) => () => {
      router.push(`${ROUTES.FOOD_DETAIL}/${foodId}`);
    },
    [router]
  );

  return (
    <div>
      <Header type="center">오늘 뭐가 땡겨?</Header>
      <Wrapper>
        <Tabs>
          {Object.values(TASTE_LEVEL).map((_level) => (
            <Tab
              key={_level}
              active={_level === level}
              onClick={handleClickTab(_level)}
            >
              {_level}
            </Tab>
          ))}
        </Tabs>
        <FilterContainer>
          <div
            css={css`
              position: relative;
            `}
          >
            <FilterSelector onChange={handleChangeCategory}>
              {categories.map((category) => (
                <option key={category.label} value={category.value}>
                  {category.label}
                </option>
              ))}
            </FilterSelector>
            <ArrowIcon>
              <Image src={arrow_under} width={14} height={14} alt="" />
            </ArrowIcon>
          </div>
        </FilterContainer>

        <FoodList foods={foods} onClickFood={handleClickFood} />
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  padding: 0 16px;
`;
const Tabs = styled.nav`
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
const FilterContainer = styled.div`
  padding: 9px 0 0;
  text-align: right;
  margin-top: 12px;

  span {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.grey0};
    margin-right: 8px;
  }
`;
const FilterSelector = styled.select`
  padding-right: 24px;
  margin: 0;
  appearance: none;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  color: white;
  cursor: inherit;
  line-height: inherit;
  border: none;
  outline: none;
`;
const ArrowIcon = styled.div`
  position: absolute;
  top: 1px;
  right: 0;
`;

export default CategoryByTaste;

const categories = [
  { label: '음식 카테고리', value: undefined },
  { label: '분식', value: '분식' },
  { label: '라면', value: '라면' },
  { label: '떡볶이', value: '떡볶이' },
  { label: '치킨', value: '치킨' },
  { label: '피자', value: '피자' },
  { label: '중식', value: '중식' },
];
