import { GET } from '@/api';

export const anonymousUserIdKey = 'ohmebddeng-anonymous-user-id';
export const userIdKey = 'ohmebddeng-user-id';

export type AnonymousUser = {
  anonymousId: string;
  userId: string;
};

export const getAnonymousUserQuery = async () => {
  const { data } = await GET<AnonymousUser>(`/user/anonymous`);
  localStorage.setItem(anonymousUserIdKey, data.anonymousId);
  localStorage.setItem(userIdKey, data.userId);

  return data;
};

export interface User {
  id: string;
  anonymousId: string;
  appleId: string | null;
  googleId: string | null;
  kakaoId: string | null;
  naverId: string | null;
  facebookId: string | null;
  email: string | null;
  password: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  role: string;
  userLevel: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    level: number;
  };
}

export const getUserQuery = async () => {
  const userId = localStorage.getItem(userIdKey);

  if (!userId) {
    throw new Error('User ID is not found');
  }

  const { data } = await GET<User>(`/user/${userId}`);

  return data;
};

export type UserCount = { count: number; levelTestedOnly: boolean };

export const getUserCount = async () => {
  const { data } = await GET<UserCount>(`/user/count`, {
    params: {
      levelTestedOnly: false,
    },
  });

  return data;
};
