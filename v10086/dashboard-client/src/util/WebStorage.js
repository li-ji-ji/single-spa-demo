const defaultStorage = window.sessionStorage
const localStorage = window.localStorage

const getUser = () => {
  let res = ""
  if(defaultStorage.getItem("user")){
    res = defaultStorage.getItem("user")
  }else if(window.localStorage.getItem("user")){
    res = window.localStorage.getItem("user")
  }
  return res
}

const setItem = (key, value) => {
  defaultStorage.setItem(key,value)
}

const getItem = key => {
  return defaultStorage.getItem(key)
}

const setLocalItem = (key, value) => {
  localStorage.setItem(key,value)
}

const getLocalItem = key => {
  return localStorage.getItem(key)
}

const delLocalItem = key => {
  localStorage.removeItem(key)
}

export { setItem, getItem, getUser, setLocalItem, getLocalItem, delLocalItem }