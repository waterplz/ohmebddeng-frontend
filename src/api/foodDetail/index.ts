import { USER_LEVEL, USER_LEVEL_NUMBER, Food } from '@/types';
import { GET } from '..';

export interface FoodCounts {
  hotLevelCount: { string: number };
  tasteTagCount: { string: number };
  totalHotLevelCount: number;
  totalTasteTagCount: number;
}

export const getFoodDetail = async (foodId: string) => {
  const { data } = await GET<Food>(`/food/${foodId}`);
  return data;
};

export const getFoodCountsQuery = async (foodId: string, level: USER_LEVEL) => {
  const { data } = await GET<FoodCounts>(
    `/review/food/count/${foodId}?level=${USER_LEVEL_NUMBER[level]}`
  );

  return data;
};
