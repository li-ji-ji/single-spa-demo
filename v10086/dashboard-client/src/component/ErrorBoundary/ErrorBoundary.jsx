import React from 'react'
import { withSnackbar } from 'notistack';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
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

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    // this.handleConnectionLoss(this.props.errMsg,'error')
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return(
        <h1>Something went wrong.</h1>
      );
    }

    return this.props.children; 
  }
}

export default withSnackbar(ErrorBoundary)