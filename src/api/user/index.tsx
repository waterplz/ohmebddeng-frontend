import { apiClient, Response } from '@/api';

export const anonymousUserIdKey = 'ohmebddeng-anonymous-user-id';
export const userIdKey = 'ohmebddeng-user-id';

export type AnonymousUser = Response<{
  anonymousId: string;
  userId: string;
}>;

export const getAnonymousUserQuery = async () => {
  try {
    const { data } = await apiClient.get<AnonymousUser>(`/user/anonymous`);

    localStorage.setItem(anonymousUserIdKey, data.data.anonymousId);
    localStorage.setItem(userIdKey, data.data.userId);

    return data;
  } catch (error) {
    // TODO: anonymous user id 저장 실패에 대한 피드백을 유저에게 전달해야한다.
    console.log(error);
    throw error;
  }
};

export interface User {
  data: {
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
  };
  statusCode: number;
  message: string;
}

export type UserCount = { count: number; levelTestedOnly: boolean };

export const getUserCount = async () => {
  const {
    data: { data },
  } = await apiClient.get<Response<UserCount>>(`/user/count`, {
    params: {
      levelTestedOnly: false,
    },
  });

  return data;
};

export const getUserData = async () => {
  const userId = localStorage.getItem(userIdKey);
  const { data } = await apiClient.get<User>(`/user/${userId}`);
  return data;
};
