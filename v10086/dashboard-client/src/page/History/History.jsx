import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Axios from 'axios'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import attrIcon from './static/attr-icon.png'
import BtnTabs from '@component/History/BtnTabs'
import Chart from '@component/History/Chart'
import SelfSwitch from '@component/History/SelfSwitch'
import { HistoryContext } from '@context/HistoryContext'
import { ChartError } from '@component/ErrorBoundary'
import { HistoryDriver } from '@component/Driver'

const useStyles = makeStyles({
  root: {
    padding: "0 1vw 1vh",
    width: "100%",
    boxSizing: 'border-box'
  },
  kindBox: {
    width: '100%',
    padding: "2vh 0.5vw 1vh",
    boxSizing: 'border-box'
  },
  kindList: {
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    '& .MuiButton-root': {
      transition: 'unset'
    }
  },
  kindBtn: {
    borderRadius: '8px',
    backgroundColor: 'rgb(10,31,60)',
    marginRight: '10px',
    marginBottom: '10px',
    color: 'rgb(204,206,210)',
    fontSize: '1vmax',
    fontWeight: '600',
    boxSizing: 'border-box',
    border: '2px solid transparent',
    '&:hover': {
      backgroundColor: 'rgb(10,31,60)',
      opacity: '0.95'
    },
  },
  kindBtnOn: {
    position: 'relative',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    backgroundColor: 'rgb(14,27,49)',
    marginRight: '10px',
    marginBottom: '10px',
    border: '2px solid rgb(4,78,139)',
    borderBottom: '2px solid transparent',
    color: 'rgb(255,255,255)',
    fontSize: '1vmax',
    fontWeight: '600',
    overflow: 'unset',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: 'rgb(14,27,49)',
      opacity: '0.95'
    },
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '12px',
      bottom: '-14px',
      backgroundColor: 'rgb(14,27,49)',
      borderLeft: '2px solid rgb(4,78,139)',
      borderRight: '2px solid rgb(4,78,139)',
      borderBottom: '2px solid rgb(14,27,49)',
      zIndex: '999',
    },
  },
  machineList: {
    border: '2px solid rgb(4,78,139)',
    boxSizing: 'border-box',
    padding: '20px 20px 10px',
    backgroundColor: 'rgb(14,27,49)',
    borderRadius: '8px',
  },
  attrBox: {
    width: '100%',
    padding: "2vh 0.5vw 1vh",
    boxSizing: 'border-box',
    marginBottom: '10px'
  },
  attrContent: {
    position: 'relative',
    backgroundColor: 'rgb(14,27,49)',
    padding: "2vh 0.5vw 1vh 70px",
    borderRadius: '8px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  attrIcon: {
    position: 'absolute',
    top: '4vh',
    transform: 'translateY(-50%)',
    left: '20px'
  },
  chartBox: {
    padding: "2vh 0.5vw 1vh",
    width: '100%',
    minHeight: '500px',
    height: '60vh',
    boxSizing: 'border-box'
  },
  onlyOpenBtn: {
    backgroundColor: 'transparent'
  }
})

const downSampleList1 = [["1分钟", "1m"], ["5分钟", "5m"], ["30分钟", "30m"], ["1小时", "1h"]] // 半天内降采样
const downSampleList2 = [["5分钟", "5m"], ["30分钟", "30m"], ["1小时", "1h"], ["6小时", "6h"]] // 七天内降采样
const downSampleList3 = [["1小时", "1h"], ["6小时", "6h"], ["1天", "1d"], ["1周", "1w"]] // 一个月内降采样
const downSampleList4 = [["6小时", "6h"], ["1天", "1d"], ["1周", "1w"], ["1个月", "1n"]] // 一个月以上降采样

const baseUrl = "/API/factory/History"
function History(props) {

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar()
  const [machine, setMachine] = useState({}) // 当前选择机器，{机器中文名：机器英文名}
  const [machineKind, setMachineKind] = useState('') // 当前选择机器类型
  const [machineStatus, setMachineStatus] = useState({}) // 所有机器状态
  const [machineMap, setMachineMap] = useState({}) // 所有机器
  const [attributeMap, setAttributeMap] = useState({}) // 所有属性
  const [attribute, setAttribute] = useState('') // 当前选择属性
  const [chartData, setChartData] = useState([]) // 图表数据
  const [assistData, setAssistData] = useState({}) // 图表辅助数据
  const [startTime, setStartTime] = useState((Date.parse(new Date()) / 1000) - 3600 * 6) // 查询的开始时间
  const [endTime, setEndTime] = useState(Date.parse(new Date()) / 1000) // 查询的结束时间
  const [downSample, setDownSample] = useState(downSampleList1[0]) // 查询的降采样
  const [downSampleList, setDownSampleList] = useState(downSampleList1) // 降采样选择列表
  const [onlyOpen, setOnlyOpen] = useState(false) // 只查看已开启机器开关

  // 使用引导
  useEffect(() => {
    HistoryDriver()
  }, [])

  // 选择机器
  const handleMachine = btn => {
    let newMachine = {}
    newMachine[btn] = machineMap[machineKind][btn]
    if (JSON.stringify(machine) !== JSON.stringify(newMachine)) {
      setMachine(newMachine)
    }
  }

  // 选择属性
  const handleAttribute = btn => {
    let newAttribute = {}
    newAttribute[btn] = attributeMap[btn]
    if (JSON.stringify(attribute) !== JSON.stringify(newAttribute)) {
      setAttribute(newAttribute)
    }
  }
  // 根据时间间隔选择降采样列表
  useEffect(() => {
    // 计算时间差
    let time = endTime - startTime
    let newDownSampleList = []
    let daySecond = 24 * 60 * 60
    if (time <= daySecond) {
      newDownSampleList = downSampleList1
    } else if (time > daySecond && time <= 7 * daySecond) {
      newDownSampleList = downSampleList2
    } else if (time > 7 * daySecond && time <= 30 * daySecond) {
      newDownSampleList = downSampleList3
    } else {
      newDownSampleList = downSampleList4
    }
    setDownSampleList(newDownSampleList)
    setDownSample(newDownSampleList[0])
  }, [endTime, startTime])

  // 根据项目查询所有历史数据机器
  useEffect(() => {
    props.project && Axios.get(baseUrl + "/mapHistoryMachine", {
      params: {
        "project": props.project['projectNameEn']
      }
    }).then(res => {
      let data = res.data
      let newMachineKind = Object.keys(data)[0]
      let newMachine = {}
      newMachine[Object.keys(data[newMachineKind])[0]] = data[newMachineKind][Object.keys(data[newMachineKind])[0]]
      setMachineMap(data) // 所有机器数据
      setMachineKind(newMachineKind) // 设置默认选中机器种类
      setMachine(newMachine) // 设置默认选中机器
    }).catch(err => {
      console.log(err)
      enqueueSnackbar("历史数据异常，请重新登陆或联系管理员", { variant: 'error' })
      return {}
    })
  }, [props, enqueueSnackbar])

  // 选择机器触发机器属性查询
  useEffect(() => {
    props.project && Object.keys(machine).length > 0
      && Axios.get(baseUrl + "/mapAttributesByMachineAndProject", {
        params: {
          "project": props.project['projectNameEn'],
          "machine": Object.values(machine)[0]
        }
      }).then(res => {
        let data = res.data
        let newAttribute = {}
        newAttribute[Object.keys(data)[0]] = data[Object.keys(data)[0]]
        setAttributeMap(data)
        setAttribute(newAttribute)
      }).catch(err => {
        enqueueSnackbar(err.response.data, { variant: 'error' })
        return {}
      })
  }, [machine, props.project, enqueueSnackbar])

  // 获取历史数据
  const getHistoryData = () => {
    // 获取设备和属性
    let device = machine[Object.keys(machine)[0]]
    let metric = attribute[Object.keys(attribute)[0]]
    let getDownSample = downSample[1]
    attribute && downSample && machine // 判断参数是否已存在
      && Axios.post(baseUrl + "/getHistory/v2", {
        startTime: startTime,
        endTime: endTime,
        device: device,
        downsample: getDownSample + '-avg',
        metric: metric
      }).then(res => {
        let data = res.data
        setChartData(data.dataList)
        setAssistData(data.assistData)
      }).catch(err => {
        console.log(err);
      })
  } // startTime, endTime, attribute, downSample, machine

  const getMachineStatus = useCallback(() => {
    props.project && Axios.get(baseUrl + "/getMachineStatus", {
      params: {
        "project": props.project['projectNameEn']
      }
    }).then(res => {
      setMachineStatus(res.data)
    }).catch(err => {
      this.handleConnectionLoss("历史数据异常，请重新登陆或联系管理员", 'error')
    })
  }, [props])

  useEffect(() => {
    getHistoryData()
    // eslint-disable-next-line
  }, [attribute])

  useEffect(() => {
    getMachineStatus()
    const intervalId = setInterval(() => {
      getMachineStatus()
    }, 30 * 1000);
    return () => clearInterval(intervalId)
  }, [getMachineStatus])

  return (
    <HistoryContext.Provider
      value={{
        // , handleDownSample: this.handleDownSample, handleStartTime: this.handleStartTime
        // , handleEndTime: this.handleEndTime,
        handleStartTime: setStartTime, handleEndTime: setEndTime,
        state: { startTime, endTime, downSample, downSampleList }, getHistoryData: getHistoryData, handleDownSample: setDownSample
      }}>
      <div className={classes.root}>
        {/* 机器列表 */}
        <div className={classes.kindBox}>
          {/* 机器种类列表 */}
          <div className={classes.kindList} id="machine-kind-list">
            <Tooltip title="只显示在线机器">
              <Button disableRipple id="online-show"
                className={classes.onlyOpenBtn}>
                <SelfSwitch checked={onlyOpen} active={() => setOnlyOpen(!onlyOpen)}></SelfSwitch>
              </Button>
            </Tooltip>
            {Object.keys(machineMap).map((kind, index) =>
              <Button disableRipple
                className={kind === machineKind ? classes.kindBtnOn : classes.kindBtn}
                onClick={() => setMachineKind(kind)} key={index}>
                {kind}
              </Button>
            )}
          </div>
          {/* 机器种类对应机器列表 */}
          <div className={classes.machineList} id="machine-list">
            {machineMap[machineKind]
              && <BtnTabs
                onlyOpen={onlyOpen}
                machineStatus={machineStatus}
                btnList={machineMap[machineKind]}
                on={Object.keys(machine)[0]}
                action={handleMachine} />
            }
          </div>
        </div>
        {/* 机器列表 */}
        <div className={classes.attrBox} id="attr-list">
          <div className={classes.attrContent}>
            <img className={classes.attrIcon} src={attrIcon} alt="属性选择栏图标" />
            {<BtnTabs
              btnList={attributeMap}
              on={Object.keys(attribute)[0]}
              action={handleAttribute} />
            }
          </div>
        </div>
        <div className={classes.chartBox} id="history-chart">
          <ChartError>
            <Chart
              title={Object.keys(machine)[0] + '/' + Object.keys(attribute)[0]}
              kind={Object.keys(attribute)[0]} assist={assistData}
              data={chartData} />
          </ChartError>
        </div>
      </div>
    </HistoryContext.Provider>
  )
}

export default History