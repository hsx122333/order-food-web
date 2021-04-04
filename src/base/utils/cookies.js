import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'; // cookie中用来存放tooken的名称

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // localStorage.clear()
  Cookies.remove(TokenKey);
}
