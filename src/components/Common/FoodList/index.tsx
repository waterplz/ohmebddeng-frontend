import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { Food } from '@/types';

export interface FoodListProps {
  foods?: Food[];
  onClickFood: (foodId: string) => void;
}
export default function FoodList({ foods, onClickFood }: FoodListProps) {
  const handleClick = useCallback(
    (foodId: string) => (e: React.MouseEvent) => {
      onClickFood(foodId);
    },
    [onClickFood]
  );

  return (
    <Container>
      {foods?.map((food) => (
        <FoodItem key={food.id} onClick={handleClick(food.id)}>
          <FoodImageContainer>
            <FoodImage src={food.imageUrl} alt={food.name} />
          </FoodImageContainer>
          <FoodInfo>
            <Name>
              {food.name} {food.subName}
            </Name>
            <Info>
              Lorem ipsum dolor, <br />
              sit amet consectetur adipisicing elit.
            </Info>
          </FoodInfo>
        </FoodItem>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
`;
const FoodItem = styled.div`
  padding: 22px 16px 20px 28px;
  display: flex;

  border-bottom: 1px solid #48484a;
`;
const FoodImageContainer = styled.div`
  width: 28px;
  height: 28px;
`;
const FoodImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
const FoodInfo = styled.div`
  margin-top: 2px;
  margin-left: 10px;
  text-align: left;
`;
const Name = styled.div`
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 17px;
  line-height: 140%;
  color: #ffffff;
`;
const Info = styled.div`
  font-size: 13px;
  color: #8e8e93;
  line-height: 140%;
`;
