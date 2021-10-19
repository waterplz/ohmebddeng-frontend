import { apiClient } from '@/api';
import { User, userIdKey } from '@/api/user';
import { Food, LEVEL } from '@/types';

export interface LevelTestFoods {
  data: {
    foodList: Food[];
  };
  statusCode: 200;
  message: 'Success';
}

export const getLevelTestFoodsQuery = async (size: number) => {
  const { data } = await apiClient.get<LevelTestFoods>(
    `/food/tests?size=${size}`
  );

  return data;
};

export const postLevelTestQuery = async (testResults: {
  [foodId: string]: LEVEL;
}) => {
  const userId = localStorage.getItem(userIdKey);
  const { data } = await apiClient.post<User>(`/user/level`, {
    userId,
    testResults,
  });

  return data;
};
