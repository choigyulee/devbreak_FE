import Cookies from 'js-cookie';

export const getAccessToken = () => {
  return Cookies.get('accessToken');
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken');
};

export const isAuthenticated = () => {
  return !!Cookies.get('accessToken');
};
