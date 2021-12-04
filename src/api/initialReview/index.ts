import { GET, POST } from '@/api';
import { User, userIdKey } from '@/api/user';
import { Food, LEVEL } from '@/types';

export interface CreatedReview {
  foodId: string;
  hotLevel: LEVEL;
  tagIds: string[];
}

export const getInitialReviewFood = async () => {
  const { data } = await GET<Food[]>('food/reviews');
  return data;
};

// 리뷰 결과 보내는 쿼리 작성 (한 개)
export const postInitialReviewQuery = async (review: CreatedReview) => {
  const userId = localStorage.getItem(userIdKey);
  const { data } = await POST<User>('/review/food', {
    data: { userId, ...review },
  });
  return data;
};

// 리뷰 결과 보내는 쿼리 작성 (여러 개)
export const postInitialReviewsQuery = async (reviewList: CreatedReview[]) => {
  const userId = localStorage.getItem(userIdKey);
  const { data } = await POST<User>('/review/foods', {
    data: { userId, reviewList },
  });
  return data;
};
