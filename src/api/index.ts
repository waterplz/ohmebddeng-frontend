import axios, { AxiosRequestConfig } from 'axios';
import CustomError, { StatusCode } from '@/utils/customError';

export const baseURL =
  process.env.NEXT_PUBLIC_APP_ENV === 'prod'
    ? 'https://api.ohmebddeng.kr/v1'
    : 'https://api-dev.ohmebddeng.kr/v1';

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type Response<T> = {
  data: T;
  statusCode: StatusCode;
  message: string;
};

const fetchWrap = async <T>({
  method,
  url,
  options,
}: {
  method: 'get' | 'post' | 'patch' | 'delete';
  url: string;
  options?: {};
}): Promise<Response<T>> => {
  const { data } = await apiClient[method]<Response<T>>(url, options);

  if (data.statusCode !== 200) {
    throw new CustomError(data.statusCode);
  }
  return data;
};

export const GET = <T>(url: string, options?: AxiosRequestConfig) =>
  fetchWrap<T>({ method: 'get', url, options });

export const POST = <T>(url: string, options?: AxiosRequestConfig) =>
  fetchWrap<T>({ method: 'post', url, options });

export const PATCH = <T>(url: string, options?: AxiosRequestConfig) =>
  fetchWrap<T>({ method: 'patch', url, options });

export const DELETE = <T>(url: string) =>
  fetchWrap<T>({ method: 'delete', url });
