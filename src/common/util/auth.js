// import Cookies from 'js-cookie'

const TokenKey = 'userInfo';

export function getToken() {
  // return Cookies.get(TokenKey)
  const userStr = sessionStorage.userInfo
  return userStr;
}

export function setToken(token) {
  sessionStorage.setItem(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  sessionStorage.removeItem(TokenKey)
  // return Cookies.remove(TokenKey)
}
