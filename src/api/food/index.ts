import { apiClient } from '@/api';
import { Food } from '@/types';

export interface FoodsByUserLevel {
  data: Food[];
  statusCode: 200;
  message: 'Success';
}

export const getFoodsByUserLevel = async (userLevel: number) => {
  const { data } = await apiClient.get<FoodsByUserLevel>(`/food/tests/result`, {
    params: { userLevel },
  });

  return data;
};
