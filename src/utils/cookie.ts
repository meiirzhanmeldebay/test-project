import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setCookie = (name: string, value: string, options = {}) => {
  cookies.set(name, value, options);
};

export const removeCookie = (name: string, options = {}) => {
  cookies.remove(name, options);
};