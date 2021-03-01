import React, { useState } from 'react';
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';


import '@util/server' // axios 配置及拦截
import Layout from '@page/Layout'
import Login from '@page/Login'
import { delLocalItem } from '@util/WebStorage'

const theme = createMuiTheme({
  normal: {
    bgColor: 'rgb(10,23,46)',
    itemBgColor: 'rgb(15,28,50)',
    itemColor: 'rgb(212,216,217)'
  },
});
function App() {

  const [isLogin, setIsLogin] = useState(true)


  // 检查登录状态
  const checkLogin = async () => {
    let token = ''
    if (window.localStorage.getItem("token")) {
      token = window.localStorage.getItem("token")
    } else if (window.sessionStorage.getItem("token")) {
      token = window.sessionStorage.getItem("token")
    }
    let res = await axios.get("/user/loginStatus?token=" + token).then(response => {
      return response.data.code
    }).catch(error => {
      console.log(error)
      return false
    })
    setIsLogin(res)
  }

  // 退出登录
  const logout = () => {
    delLocalItem("user")
    delLocalItem("token")
    window.sessionStorage.clear()
    setIsLogin(false)
  }

  checkLogin()


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
            {isLogin
              ? <Layout logout={() => logout()} />
              : <Login handleIsLogin={(isLogin) => setIsLogin(isLogin)} />}
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
