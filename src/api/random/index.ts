import { GET } from '@/api';

export type RandomFoodType = {
  id: string;
  name: string;
  subName: string;
  imageUrl: string;
};

export const getRandomFood = async () => {
  const { data } = await GET<RandomFoodType>('/food/random');
  return data;
};
