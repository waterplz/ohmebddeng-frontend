import { rest } from 'msw';
import { baseURL } from '@/api';

export const getFoods = () => {
  return rest.get(`${baseURL}/food`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: '11',
            name: '엽기떡볶이',
            subName: '착한맛',
            imageUrl: 'https://cdn.ohmebddeng.kr/foods/yuptteok.png',
            hotLevel: '냠냠',
          },
          {
            id: '15',
            name: '진라면',
            subName: '순한맛',
            imageUrl: 'https://cdn.ohmebddeng.kr/foods/jinramyeon.png',
            hotLevel: '냠냠',
          },
          {
            id: '16',
            name: '굽네치킨 고추 바사삭',
            subName: '순살',
            imageUrl: 'https://cdn.ohmebddeng.kr/foods/goobne.png',
            hotLevel: '냠냠',
          },
        ],
        statusCode: 200,
        message: 'Success',
      })
    );
  });
};

export default [getFoods()];
