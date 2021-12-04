import { GET } from '@/api';
import { userIdKey } from '@/api/user';

export type RandomFoodType = {
  id: string;
  name: string;
  subName: string;
  imageUrl: string;
};

export const getRandomFood = async () => {
  const userId = localStorage.getItem(userIdKey);

  const { data } = await GET<RandomFoodType>('/food/random', {
    params: {
      userId,
    },
  });

  return data;
};
