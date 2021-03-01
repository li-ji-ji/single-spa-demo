import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import './index.css'

import { setLocalItem, getLocalItem} from '@util/WebStorage'



const HistoryDriver = () => {
  if(JSON.parse(getLocalItem("HistoryDriver")) !== true){
    const historyDriver = new Driver({
      stageBackground:"rgb(10,23,46)",
      allowClose:false,
      doneBtnText: '结束', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步', // Called when element has been deselected
      onReset:() => {
        if(window.confirm("确认关闭引导？")){
          setLocalItem("HistoryDriver",true)
        }
      }
    });
    historyDriver.defineSteps([
      {
        element: '#machine-kind-list',
        popover: {
          title: '机器类别',
          description: '点击标签切换机器类别',
          position: 'bottom'
        }
      },
      {
        element: '#machine-list',
        popover: {
          title: '机器列表',
          description: '点击按钮选择机器',
          position: 'bottom'
        }
      },
      {
        element: '#online-show',
        popover: {
          title: '在线设备',
          description: '点击切换是否仅显示在线设备',
          position: 'right'
        }
      },
      {
        element: '#attr-list',
        popover: {
          title: '属性列表',
          description: '点击按钮选择机器属性',
          position: 'bottom'
        }
      },
      {
        element: '#history-chart',
        popover: {
          title: '数据图表',
          description: '显示历史数据',
          position: 'top'
        }
      },
      {
        element: '#history-time-picker',
        popover: {
          title: '时间选择',
          description: '点击选择开始及结束时间',
          position: 'bottom'
        }
      },
      {
        element: '#history-downSample',
        popover: {
          title: '降采样选择',
          description: '点击选择数据聚合的降采样',
          position: 'bottom'
        }
      },
    ]);
    historyDriver.start()
  }
}

export default HistoryDriver;