import { GET, POST } from '@/api';
import { User, userIdKey } from '@/api/user';
import { Food, LEVEL } from '@/types';

export const getLevelTestFoodsQuery = async () => {
  const { data } = await GET<Food[]>(`/food/tests`);

  return data;
};

export const postLevelTestQuery = async (
  answers: {
    foodId: string;
    hotLevel: LEVEL;
  }[]
) => {
  const userId = localStorage.getItem(userIdKey);
  const { data } = await POST<User>(`/user/level`, {
    userId,
    answers,
  });
  return data;
};
