import food from '@/mocks/food';
import levelTest from '@/mocks/levelTest';
import user from '@/mocks/user';

export const handlers = [
  ...Object.values(levelTest),
  ...Object.values(user),
  ...Object.values(food),
];
