import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Image from 'next/image';
import router from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getRandomFood, RandomFoodType } from '@/api/random';
import { Header } from '@/components/Common';
import Button from '@/components/Input/Button';
import { ROUTES } from '@/constants';

const TestResult: NextPage = () => {
  const [reRender, setReRender] = useState<number>(0);
  const { status, data: randomFood } = useQuery<RandomFoodType>(
    ['getUserCount', reRender],
    getRandomFood
  );

  const goMain = () => {
    router.push(ROUTES.MAIN);
  };

  const reRecommand = () => {
    setReRender((number: number) => number + 1);
  };

  return (
    <>
      <Header type="center">
        <span>오늘의 랜덤 추천</span>
      </Header>
      <Container>
        {status !== 'loading' ? (
          <div className="random__content">
            {randomFood && (
              <Image
                src={randomFood?.imageUrl}
                alt="error"
                width="124"
                height="193"
              />
            )}
            <div className="random__content__text">
              <h2>{randomFood?.name}</h2>
              <h2 className="random__content__text__sub">
                {randomFood?.subName}
              </h2>
            </div>
          </div>
        ) : (
          <div>로딩중</div>
        )}
        <Buttons>
          <Button
            buttonType="outline"
            color="green"
            rounded
            fullWidth
            onClick={reRecommand}
          >
            다시 추천받기
          </Button>
          <Button
            fullWidth
            buttonType="outline"
            color="red"
            rounded
            onClick={goMain}
          >
            홈으로
          </Button>
        </Buttons>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .random {
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 76px;

      &__image-box {
        width: 40%;
        img {
          width: 100%;
        }
      }
      &__text {
        h2 {
          margin-top: 20px;
          font-size: 32px;
          font-weight: 400;
        }

        &__sub {
          margin-top: 30px;
          font-size: 26px;
        }
      }
    }
  }
`;

const Buttons = styled.div`
  width: 100%;
  max-width: 343px;
  margin-top: 181px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & button:first-of-type {
    margin-bottom: 16px;
  }
`;
export default TestResult;
