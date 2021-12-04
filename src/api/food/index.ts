import { GET } from '@/api';
import { Food, TASTE_LEVEL } from '@/types';

interface GetFoodsParams {
  category?: string;
  hotLevel?: TASTE_LEVEL;
}

export const getFoods = async ({ category, hotLevel }: GetFoodsParams) => {
  const { data } = await GET<Food[]>(`/food`, {
    params: { category, hotLevel },
  });

  return data;
};
