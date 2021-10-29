import { apiClient } from '@/api';
import { User, userIdKey } from '@/api/user';
import { Food, HOT_LEVEL_SERVER } from '@/types';

export interface LevelTestFoods {
  data: Food[];
  statusCode: 200;
  message: 'Success';
}

export const getLevelTestFoodsQuery = async () => {
  const { data } = await apiClient.get<LevelTestFoods>(`/food/tests`);

  return data;
};

export const postLevelTestQuery = async (testResults: {
  [foodId: string]: HOT_LEVEL_SERVER;
}) => {
  const userId = localStorage.getItem(userIdKey);
  const { data } = await apiClient.post<User>(`/user/level`, {
    userId,
    testResults,
  });

  return data;
};
