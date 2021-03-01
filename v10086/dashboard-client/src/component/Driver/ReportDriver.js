import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import './index.css'

import { setLocalItem, getLocalItem } from '@util/WebStorage'



const ReportDriver = () => {
  if (JSON.parse(getLocalItem("ReportDriver")) !== true) {
    const reportDriver = new Driver({
      stageBackground: "rgb(10,23,46)",
      allowClose: false,
      doneBtnText: '结束', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步', // Called when element has been deselected
      onReset: () => {
        if (window.confirm("确认关闭引导？")) {
          setLocalItem("ReportDriver", true)
        }
      }
    });
    reportDriver.defineSteps([
      {
        element: '#report-range-picker',
        popover: {
          title: '周期选择',
          description: '点击切换报表生成周期',
          position: 'bottom'
        }
      },
      {
        element: '#report-show-more',
        popover: {
          title: '查询模式',
          description: '点击开启报表查询模式',
          position: 'bottom'
        },
        onNext: () => {
          if (document.getElementsByClassName("MuiCollapse-container MuiCollapse-hidden").length > 0) {
            document.getElementById("report-show-more").click()
          }
        }
      },
      {
        element: '#report-time-picker',
        popover: {
          className: 'report-time-picker',
          title: '时间选择',
          description: '点击选择开始及结束时间',
          position: 'bottom'
        }
      },
      {
        element: '#report-downSample',
        popover: {
          title: '时间周期',
          description: '点击选择报表生成的时间周期',
          position: 'bottom'
        }
      },
      {
        element: '#report-table',
        popover: {
          title: '报表',
          description: '生成的报表',
          position: 'top'
        }
      },
      {
        element: '#report-chart',
        popover: {
          title: '报表图表',
          description: '报表所对应的图表',
          position: 'top'
        }
      },
    ]);
    reportDriver.start()
  }
}

export default ReportDriver;
