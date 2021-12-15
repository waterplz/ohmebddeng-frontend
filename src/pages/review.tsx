import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import {
  getInitialReviewFood,
  postInitialReviewQuery,
  postFoodRequestQuery,
} from '@/api/initialReview';
import { getUserQuery, User } from '@/api/user';
import { Header } from '@/components/Common';
import Button from '@/components/Input/Button';
import { ReviewForm } from '@/components/Review';
import { ROUTES } from '@/constants';
import { LEVEL, ReviewState, Food } from '@/types';

const Review: NextPage = () => {
  const router = useRouter();
  const [review, setReview] = useState<ReviewState>({});
  const [recommendatedFood, setRecommendatedFood] = useState('');
  const [isTestDone, setIsTestDone] = useState(false);
  const { data: food } = useQuery<Food>(['initialReviewFoods'], () =>
    getInitialReviewFood()
  );
  const { data: user } = useQuery<User>(['getUser'], getUserQuery);

  const goTestResult = () =>
    router.push(`${ROUTES.TEST_RESULT}/${user?.userLevel.level}`);

  const mutationReview = useMutation(postInitialReviewQuery, {
    onSuccess: () =>
      recommendatedFood.length
        ? mutationRequest.mutate(recommendatedFood)
        : goTestResult(),
  });

  const mutationRequest = useMutation(postFoodRequestQuery, {
    onSuccess: () => goTestResult(),
  });

  const handleReview = (value: ReviewState) => {
    setReview(value);
  };

  const handleIsTestDone = (value: boolean) => {
    setIsTestDone(value);
  };

  const handleSubmit = () => {
    if (!food) return;
    if (!isTestDone) {
      alert('선택을 완료해주세요');
      return;
    }
    const tags = Array.from(review.taste ?? []);
    mutationReview.mutate({
      hotLevel: review.level as LEVEL,
      tags,
      foodId: food?.id,
    });
  };

  const handleInputTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRecommendatedFood(event.target.value);
  };

  return (
    <Container>
      <Header type="center">리뷰작성</Header>
      <TitleContainer>
        <Title>
          <span>🔥</span>
          <Description>
            매운맛에 진심인 당신의 도움이 필요합니다! 리뷰 작성 으로 많은
            사람에게 정보를 제공해줄 수 있어요.
          </Description>
        </Title>
      </TitleContainer>
      <ReviewForm
        review={review}
        handleReview={handleReview}
        handleIsTestDone={handleIsTestDone}
      >
        {food && (
          <ReviewFormTitle>
            <Image src={food.imageUrl} alt="error" width="32" height="24" />
            <h2>{food.name}</h2>
          </ReviewFormTitle>
        )}
      </ReviewForm>
      <RecommendationContainer>
        <RecommendationTitle>
          추천하고 싶은 매운 음식이 있나요? (선택)
        </RecommendationTitle>
        <RecommendationTextArea
          value={recommendatedFood}
          onChange={handleInputTextArea}
        />
      </RecommendationContainer>
      <ButtonContainer>
        <div>
          <Button
            fullWidth
            buttonType={'contained'}
            color={'darkGrey'}
            rounded={false}
            onClick={handleSubmit}
          >
            다음에 할래요
          </Button>
        </div>
        <Button
          fullWidth
          buttonType={'contained'}
          color={isTestDone ? 'red' : 'grey'}
          rounded={false}
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 100%;
  padding: 8px 16px 18px 16px;
`;

const Title = styled.div`
  display: flex;
  min-height: 58px;
  background-color: ${({ theme }) => `${theme.colors.grey50}`};
  border-radius: 16px;
  padding: 13px 15px 11px 12px;
`;

const Description = styled.p`
  max-width: 310px;
  font-size: 12px;
  line-height: 16.8px;
  margin-left: 6px;
  font-weight: normal;
  text-align: left;
`;

const ReviewFormTitle = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: left;
  padding: 0px 0 12px 17px;

  & h2 {
    margin-left: 8px;
  }
`;

const RecommendationContainer = styled.div`
  width: 100%;
  padding: 0 16px 48px 16px;
`;
const RecommendationTitle = styled.p`
  font-size: 15px;
  margin-bottom: 13px;
  text-align: left;
`;

const RecommendationTextArea = styled.textarea`
  width: 100%;
  height: 78px;
  background-color: ${({ theme }) => `${theme.colors.grey50}`};
  border: none;
  overflow: auto;
  outline: none;
  resize: none;
  color: ${({ theme }) => `${theme.colors.white}`};
  border-radius: 14px;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;

  padding: 0 16px;
  & div {
    width: 61.06666666666667%;
  }
`;
export default Review;
