import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import './index.css'

import { setLocalItem, getLocalItem} from '@util/WebStorage'



const HomeDriver = () => {
  if(JSON.parse(getLocalItem("HomeDriver")) !== true){
    const homeDriver = new Driver({
      stageBackground:"rgb(10,23,46)",
      animate: false,
      allowClose:false,
      doneBtnText: '结束', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步', // Called when element has been deselected
      onReset:() => {
        if(window.confirm("确认关闭引导？")){
          setLocalItem("HomeDriver",true)
        }
      }
    });
    homeDriver.defineSteps([
      {
        element: '#layout-project-picker',
        popover: {
          title: '项目列表',
          description: '点击可切换项目',
          position: 'bottom'
        }
      },
      {
        element: '#layout-reset-driver',
        popover: {
          title: '重启引导按钮',
          description: '重启平台使用引导',
          position: 'bottom-right'
        }
      },
      {
        element: '#layout-logout-btn',
        popover: {
          title: '注销按钮',
          description: '点击可退出登录',
          position: 'bottom-right'
        }
      },
      {
        element: '#layout-sidebar-show',
        popover: {
          title: '导航栏切换',
          description: '点击可切换导航栏显示模式，显示导航栏详细信息',
          position: 'right'
        }
      },
      {
        element: '#layout-menu',
        popover: {
          title: '导航栏',
          description: '点击可切换页面',
          position: 'right'
        }
      },
      {
        element: '#home-kind-btn',
        popover: {
          title: '属性切换',
          description: '点击卡片可以将下方图表切换到对应属性',
          position: 'right'
        }
      },
      {
        element: '#home-range-btn',
        popover: {
          title: '周期切换',
          description: '点击按钮可以切换图表对应时间周期',
          position: 'top'
        }
      },
      {
        element: '#home-data-table',
        popover: {
          title: '数据列表',
          description: '根据上一步选择的时间周期显示数据',
          position: 'left'
        }
      },
    ]);
    homeDriver.start()
  }
}

export default HomeDriver;
