import React, { Component, Suspense } from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import axios from "axios";

import SideBar from '@component/Layout/SideBar'
import Header from '@component/Layout/Header'
import _router from '@util/_router'

import { LayoutContext } from '@context/LayoutContext'

import * as Storage from '@util/WebStorage'

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: '100vh'
  },
  main: {
    flex: 1,
    height: '100vh',
    overflowX:'hidden',
    paddingLeft: '60px',
  },
  sideBarClose: {
    paddingLeft: '60px',
  },
  sideBarOpen: {
    paddingLeft: '200px'
  }
}
export class Layout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sideBarOpen: false, // 侧边栏状态
      projectName: '', // 项目名
      projectMap: {}, 
      projectMsg:{}
    }
  }

  /*--------Toast---------*/
  // 打开Toast
  handleConnectionLoss = (text, variant) => {
    this.key = this.props.enqueueSnackbar(text, { variant });
  };
  // 关闭Toast
  handleBackOnline = () => {
    this.props.closeSnackbar(this.key);
  };
  /*--------Toast---------*/

  loading = <div ref={this.wrapper}><Backdrop open><CircularProgress color="inherit" /></Backdrop></div>

  // 侧边栏缩放控制
  setSidebarStatus = open => {
    this.setState({
      sideBarOpen: open
    })
  }

  // 控制主题边框
  setMainPadding = (classes) => {
    return this.state.sideBarOpen ? classes.sideBarOpen : classes.sideBarClose
  }

  // 获取项目及项目列表
  getProject = async () => {
    // 从缓存获取用户名
    let user = Storage.getUser()
    user && await axios.post('/API/factory/user/getProject', {
      username: user
    }).then( response => {
      // 本地存储项目信息保证全局一致性
      let res = response.data
      this.setState({
        projectMsg:res,
        projectName:res['project']['projectNameZh'],
        projectMap:res['allProject']
      })
      return true
    }).catch( err => {
      console.log(err)
      this.handleConnectionLoss("用户数据丢失，请重新登录或联系管理员",'error')
      return false
    })
  }

  // 选择项目
  setProject = (projectNameEn,projectNameZh) => {
    let project = this.state.projectMsg['project']
    project['projectNameEn'] = projectNameEn
    project['projectNameZh'] = projectNameZh
    this.setState({
      projectName:projectNameZh
    })
    // window.location.reload()
    this.handleConnectionLoss("项目切换成功",'success')
  }

  logout = () => {
    this.handleConnectionLoss("退出登录",'success')
    this.props.logout()
  }

  resetDriver = () => {
    if(window.confirm("确定重启使用引导")){
      Storage.delLocalItem("HomeDriver")
      Storage.delLocalItem("RealtimeDriver")
      Storage.delLocalItem("HistoryDriver")
      Storage.delLocalItem("ReportDriver")
      window.location.reload()
    }
  }

  componentWillMount = () => {
    this.getProject()
  }

  render() {
    const classes = this.props.classes
    return (
      <LayoutContext.Provider value={{state:this.state,setProject:this.setProject}}>
        <div className={classes.container}>
          {/* 侧边栏菜单 */}
          <SideBar open={this.state.sideBarOpen} setSidebarStatus={this.setSidebarStatus} ></SideBar>
          <main className={`${classes.main}`}>
            {/* 顶栏 */}
            <Header logout={() => this.logout()} resetDriver={this.resetDriver} project={this.state.projectName} projectMap={this.state.projectMap} />
            {/* 页面主体 */}
            <Suspense fallback={this.loading}>
              <Switch>
                {_router.map((route, index) => {
                  return route.component ? (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component project={ this.state.projectMsg["project"] } {...props} />
                      )} />
                  ) : (null);
                })}
              </Switch>
            </Suspense>
          </main>
        </div>
      </LayoutContext.Provider>
    )
  }
}

export default withSnackbar(withStyles(styles)(Layout))
