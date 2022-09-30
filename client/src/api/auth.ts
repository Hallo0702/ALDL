import API from './index';

export const login = async (params: { email: string; password: string }) => {
  const res = await API.get('/auth/login', { params });
  return res;
};

export const signup = async (body: {
  email: string;
  password: string;
  name: string;
  nickname: string;
}) => {
  const res = await API.post('/auth/signup', body);
  return res;
};

export const logout = async (body: { refreshToken: string }) => {
  try {
    const res = await API.delete('/auth/logout', { data: body });
    return res;
  } catch (err) {
    throw err;
  }
};

export const refresh = async (body: { refreshToken: string }) => {
  try {
    const res = await API.post('/token/refresh', body);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const emailduplicate = async (params: { email: string }) => {
  try {
    const res = await API.get('/auth/emailduplicate', { params });
    return res;
  } catch (err) {
    throw err;
  }
};

export const nicknameduplicate = async (params: { nickname: string }) => {
  try {
    const res = await API.get('/auth/nicknameduplicate', { params });
    return res;
  } catch (err) {
    throw err;
  }
};

export const checkAuthCode = async (params: {
  email: string;
  authcode: string;
}) => {
  try {
    const res = await API.get('/auth/checkAuthCode', { params });
    return res;
  } catch (err) {
    throw err;
  }
};

export const sendAuthCode = async (body: { email: string }) => {
  try {
    const res = await API.patch('/sendAuthCode', body);
    return res;
  } catch (err) {
    throw err;
  }
};
