export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setToken = (value) => {
  localStorage.setItem('token', value);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const clearStorage = () => {
  localStorage.clear();
};

export const setUser = (value) => {
  localStorage.setItem('user', JSON.stringify(value));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};