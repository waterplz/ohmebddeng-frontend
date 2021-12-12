import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { SpicyLevelSection } from '@/components/Common';
import { TasteForm } from '@/components/Review';
import { LEVEL, ReviewState, TASTE } from '@/types';

export interface ReviewFormProps {
  review: ReviewState;
  handleReview: (review: ReviewState) => void;
  handleIsTestDone: (value: boolean) => void;
  children?: React.ReactNode;
}

const ReviewForm = ({
  review,
  handleReview,
  handleIsTestDone,
  children,
}: ReviewFormProps) => {
  const handleCheckLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = (event.target as HTMLInputElement).value as LEVEL;
    handleReview({ ...review, level });
  };
  const handleCheckTaste = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetTaste = (event.target as HTMLInputElement).value as TASTE;
    const taste = review.taste ?? new Set();
    taste.has(targetTaste)
      ? taste.delete(targetTaste)
      : taste.size < 5 && taste.add(targetTaste);
    handleReview({ ...review, taste });
  };

  useEffect(() => {
    handleIsTestDone(!(!review.level || !review.taste || !review.taste.size));
  }, [handleIsTestDone, review]);

  return (
    <ReviewSection>
      <SpicyLevelSection
        disabled={false}
        level={review?.level}
        transparent={true}
        onChange={handleCheckLevel}
      >
        {children}
      </SpicyLevelSection>
      <Divider />
      <TasteSection>
        <h3>키워드로 설명해주세요 (필수 1-5개)</h3>
        <TasteForm taste={review?.taste} onChange={handleCheckTaste} />
      </TasteSection>
    </ReviewSection>
  );
};

const ReviewSection = styled.section`
  margin: 0 16px 56px;
  background-color: ${({ theme }) => `${theme.colors.grey50}`};
  border-radius: 16px;
`;

const Divider = styled.div`
  margin: 0 20px;
  border-top: ${({ theme }) => `2px solid ${theme.colors.grey40}`};
`;

const TasteSection = styled.div`
  padding: 28px 14px;
  text-align: left;

  h3 {
    padding: 0 10px;
  }
`;

export default ReviewForm;
