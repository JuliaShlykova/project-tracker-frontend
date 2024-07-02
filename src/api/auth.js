import { clearStorage, setToken, setUser } from '../services/localStorage';
import api from './authInstance';
import removeTokenCookie from '../utils/removeCookies';

export const signout = async() => {
  try {
    removeTokenCookie();
    clearStorage();
    await api.post('/auth/logout', {});
    return;
  } catch(err) {
    console.log(err);
  } finally {
    window.location.href = '/';
  }
};

export const login = async(data) => {
  try {
    const response = await api.post('/auth/login', data);
    setToken(response.data.token);
    let user = {nickname: response.data.nickname, _id: response.data._id, profileImgUrl: response.data.profileImgUrl};
    setUser(user);
    return;
  } catch(err) {
    return Promise.reject(err);
  }
};

export const signup = async(data) => {
  try {
    const response = await api.post('/auth/signup', data);
    setToken(response.data.token);
    let user = {nickname: response.data.nickname, _id: response.data._id}
    setUser(user);
    return;
  } catch(err) {
    return Promise.reject(err);
  }
};