import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import './index.css'

import { setLocalItem, getLocalItem } from '@util/WebStorage'



const RealtimeDriver = () => {
  if (JSON.parse(getLocalItem("RealtimeDriver")) !== true) {
    const realtimeDriver = new Driver({
      stageBackground: "rgb(10,23,46)",
      allowClose: false,
      doneBtnText: '结束', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步', // Called when element has been deselected
      onReset: () => {
        if (window.confirm("确认关闭引导？")) {
          setLocalItem("RealtimeDriver", true)
        }
      }
    });
    realtimeDriver.defineSteps([
      {
        element: '#realtime-summary',
        popover: {
          title: '概览数据',
          description: '工厂现场实时数据概览',
          position: 'bottom'
        }
      },
      {
        element: '#realtime-machine',
        popover: {
          title: '机器数据',
          description: '工厂现场机器实时数据',
          position: 'top'
        }
      }
    ]);
    realtimeDriver.start()
  }
}

export default RealtimeDriver;
