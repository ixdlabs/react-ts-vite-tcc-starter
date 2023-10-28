import { useMutation } from '@tanstack/react-query';
// import { jwtDecode } from 'jwt-decode';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AUTH_URL } from '@/config/urls';
import { apiCall } from '@/util/api';

export interface IAuthData {
  access: string;
  refresh: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

interface IAuthState {
  data?: IAuthData;
  loginAction: (token: IAuthData) => void;
  logoutAction: () => void;
}

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      (set) => ({
        data: undefined,
        loginAction: (data) => set({ data }),
        logoutAction: () => set({ data: undefined }),
      }),
      { name: 'auth', getStorage: () => localStorage },
    ),
  ),
);

export function useAuth() {
  const { data, loginAction, logoutAction } = useAuthStore();

  const loginMutation = useMutation({
    // mutationFn: (data: { email: string; password: string }) =>
    //   apiCall<IAuthData>({
    //     method: 'POST',
    //     url: AUTH_URL + 'login/',
    //     json: data,
    //   }),
    mutationFn: () => {
      return Promise.resolve({
        access: 'xxxxxxx',
        refresh: 'yyyyyy',
        user: { id: '1234', first_name: 'Abc', last_name: 'Def' },
      });
    },
    onSuccess: (resData: IAuthData) => {
      loginAction(resData);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      logoutAction();
      return apiCall({
        method: 'POST',
        url: AUTH_URL + 'logout/',
        json: data,
      });
    },
  });

  const forgetPasswordMutation = useMutation({
    mutationFn: (data: { email: string }) =>
      apiCall<{ detail: string }>({
        method: 'POST',
        url: AUTH_URL + 'password/reset/',
        json: data,
      }),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: {
      new_password1: string;
      new_password2: string;
      uid: string;
      token: string;
    }) =>
      apiCall<{ detail: string }>({
        method: 'POST',
        url: AUTH_URL + 'password/reset/',
        json: data,
      }),
  });

  const getToken = () => {
    if (!data) return undefined;

    return data.access;

    // const decoded = jwtDecode<{ exp: number }>(data.access);

    // if (decoded.exp < Date.now() / 1000) {
    //   logoutAction();
    //   return undefined;
    // }

    // return data.access;
  };

  return {
    data,
    isAuth: !!data,
    token: getToken(),
    loginMutation,
    logoutMutation,
    forgetPasswordMutation,
    resetPasswordMutation,
  };
}
