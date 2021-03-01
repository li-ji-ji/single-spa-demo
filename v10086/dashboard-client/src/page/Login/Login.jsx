import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useSnackbar } from 'notistack';
import axios from "axios";

import bgMp4 from './static/qie.mp4'
// import bgWebM from './static/qie.webm'
import title from './static/title.png'
import loginBox from './static/loginBox.png'
import logo from './static/logo.png'
import userIcon from './static/user-icon.png'
import pwdIcon from './static/pwd-icon.png'

import * as Storage from '@util/WebStorage'


const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh'
  },
  videoBg: {
    position: "absolute",
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
  },
  title: {
    position: 'absolute',
    width: '100%',
    top: '5vh',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '1',
    '& img ': {
      width: '50%'
    }
  },
  loginBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '20vw',
    height: '20vw',
    minWidth: '360px',
    minHeight: '360px',
    position: 'absolute',
    top: '50%',
    right: '8%',
    transform: 'translateY(-50%)',
    zIndex: '1',
    backgroundImage: `url(${loginBox})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    padding: '40px 0',
    boxSizing: 'border-box'
  },
  logoBox: {
    width: '100%',
    marginBottom: '30px',
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  logo: {
    width: '60%',
    margin: '0 auto'
  },
  form: {
    width: '80%',
    position: 'absolute',
    top: '55%',
    transform: 'translateY(-50%)'
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    backgroundSize: "100% 100%",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'border-box',
    border: '1px solid rgb(8,186,229)',
    borderRadius: '5px',
    '& input': {
      color: '#fff',
      fontSize: '1.4rem',
      borderLeft: '1px solid rgb(8,186,229)',
      backgroundColor: 'rgb(1,10,22)',
      padding: '1vh 0 1vh 1vw',
    },
    '& .MuiInputBase-input': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0'
    },
    '& .MuiOutlinedInput-root': {
      paddingLeft: '0'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover': {
      boxShadow: '0 0 8px rgba(0,128,186,.5)'
    },
  },
  inputIcon: {
    margin: '0',
    display: 'flex',
    padding: "10px",
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '60%'
    }
  },
  rememberMe: {
    color: '#fff',
    marginBottom: '10px',
    '& svg': {
      color: '#fff'
    }
  },
  submit: {
    fontSize: '1.2rem',
    backgroundColor: 'rgb(8,186,229)',
    padding: '0 16px',
    '&:hover': {
      backgroundColor: 'rgb(8,186,229)',
      boxShadow: '0 0 8px rgba(8,186,229,.5)'
    }
  }
})

export default function Login(props) {

  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  // 用户登录
  const login = () => {
    axios.post('/user/login', {
      username: username,
      password: password
    }).then(response => {
      let result = response.data
      // 用户登陆状态
      if (result['code'] === '0') {
        enqueueSnackbar(result['msg'], { variant: 'error' });
      }
      let msg = JSON.parse(result['msg'])
      let token = msg['jwt']
      // 判断是否记住登录
      if (rememberMe) {
        // 存入LocalStorage
        window.localStorage.setItem("user", username)
        window.localStorage.setItem("token", token)
      } else {
        // 存入SessionStorage
        Storage.setItem("user", username)
        Storage.setItem("token", token)
      }
      // 获取项目信息
      enqueueSnackbar('登录成功', { variant: 'success' });
      props.handleIsLogin(true)
    }).catch(error => {
      console.log(error)
      return {}
    })
  };

  return (
    <div className={classes.root}>
      <video className={classes.videoBg} loop autoPlay muted>
        {/* <source src={bgWebM} type="video/webm" /> */}
        <source src={bgMp4} type="video/mp4" />
      </video>
      <div className={classes.title}>
        <img src={title} alt="" />
      </div>
      <div className={classes.loginBox}>
        <div className={classes.logoBox}>
          <img className={classes.logo} src={logo} alt="" />
        </div>
        <form action="" className={classes.form} onSubmit={(e) => e.preventDefault()}>
          <TextField
            required
            fullWidth
            variant="outlined"
            value={username}
            type="text"
            className={classes.input}
            onChange={e => setUsername(e.target.value)}
            placeholder='请输入帐号'
            InputProps={{
              startAdornment: (
                <InputAdornment className={classes.inputIcon} position="start">
                  <img src={userIcon} alt="" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            value={password}
            type="password"
            className={classes.input}
            onChange={e => setPassword(e.target.value)}
            placeholder='请输入密码'
            InputProps={{
              startAdornment: (
                <InputAdornment className={classes.inputIcon} position="start">
                  <img src={pwdIcon} alt="" />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            className={classes.rememberMe}
            control={<Checkbox value="remember" color='default' checked={rememberMe} onChange={e => setRememberMe(!rememberMe)} />}
            label="七天内免登录"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => login({ username, password })}
          >
            登    录
          </Button>
        </form>
      </div>
    </div>
  )
}
