import { css } from '@emotion/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getFoodDetail } from '@/api/foodDetail';
import { postInitialReviewQuery } from '@/api/initialReview';
import { Header } from '@/components/Common';
import FoodOverview from '@/components/Common/FoodOverview';
import Button from '@/components/Input/Button';
import { ReviewForm } from '@/components/Review';
import { ROUTES } from '@/constants';
import { Food, LEVEL, ReviewState } from '@/types';

const ReviewWrite: NextPage<Food> = () => {
  const router = useRouter();
  const foodId = router.query.id as string;
  const [review, setReview] = useState<ReviewState>({});
  const [isTestDone, setIsTestDone] = useState(false);
  const { data: foodDetail } = useQuery<Food>(
    ['FoodDetails', foodId],
    () => getFoodDetail(foodId),
    { enabled: !!foodId }
  );

  const food = {
    id: foodId,
    imageUrl: foodDetail ? foodDetail.imageUrl : '',
    name: foodDetail ? foodDetail.name : '',
    subName: foodDetail ? foodDetail.subName : '',
  };

  const mutation = useMutation(postInitialReviewQuery, {
    onSuccess: () => router.push(`${ROUTES.FOOD_DETAIL}/${foodId}`),
  });

  const handleIsTestDone = (value: boolean) => {
    setIsTestDone(value);
  };

  const handleReview = (value: ReviewState) => {
    setReview(value);
  };

  const handleSubmit = () => {
    if (!isTestDone) {
      alert('선택을 완료해주세요');
      return;
    }
    const tags = Array.from(review.taste ?? []);
    mutation.mutate({ hotLevel: review.level as LEVEL, tags, foodId });
  };

  return (
    <>
      <Header type="center">
        <span>리뷰 작성하기</span>
      </Header>

      {food.imageUrl && <FoodOverview {...food} />}
      <ReviewForm
        review={review}
        handleReview={handleReview}
        handleIsTestDone={handleIsTestDone}
      />
      <Button
        buttonType="contained"
        color={isTestDone ? 'red' : 'grey'}
        rounded={false}
        css={css`
          width: 100%;
        `}
        onClick={handleSubmit}
      >
        등록하기
      </Button>
    </>
  );
};

export default ReviewWrite;
