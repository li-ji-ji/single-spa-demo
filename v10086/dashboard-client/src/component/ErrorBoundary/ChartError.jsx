import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = theme => ({
  root:{
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const Refresh = () =>  <Link href="#" onClick={() => window.location.reload()}>刷新</Link>

export class ChartError extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo)
  }

  render() {
    const { classes } = this.props
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return(
        <div className={classes.root}>
          <h1>当前图表数据异常</h1>
          <h1>请<Refresh/>页面或者联系管理员</h1>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default withStyles(useStyles)(ChartError)
