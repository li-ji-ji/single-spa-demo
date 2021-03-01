import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Axios from 'axios'

import Card from '@component/Realtime/Card'
import Table from '@component/Realtime/Table'
import { RealtimeDriver } from '@component/Driver'

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: "0 1vw 0",
    boxSizing: 'border-box'
  },
  boxTop: {
    width: '100%',
    height: '20vh',
    padding: "2vh 0.5vw 1vh",
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxBottom: {
    width: '100%',
    height: '70vh',
    padding: "2vh 0.5vw 1vh",
    boxSizing: 'border-box',
    overflowY: 'scroll',
    overflowX: 'hidden',
    borderRadius: '15px',
  }
})

const baseUrl = "/API/factory/RealTime"
function Realtime(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [cardData, setCardData] = useState([
    {
      title: '瞬时流量',
      unit: 'm³/min',
      name: 'flow',
      key: '流量',
      data: 0
    },
    {
      title: '瞬时功率',
      unit: 'kw',
      name: 'power',
      key: '功率',
      data: 0
    },
    {
      title: '瞬时压力',
      unit: 'bar',
      name: 'pressure',
      key: '压力',
      data: 0
    },
    {
      title: '瞬时单耗',
      unit: 'kwh/m³',
      name: 'unitCost',
      key: '单耗',
      data: 0
    },
  ]) // 头部概览数据
  const [tableData, setTableData] = useState({}) // 表格数据

  // 使用引导
  useEffect(() => {
    RealtimeDriver()
  }, [])

  // 获取实时概览数据
  const getTableData = useCallback(() => {
    let newCardData = [{ title: '瞬时流量', unit: 'm³/min', name: 'flow', key: '流量', data: 0 }, { title: '瞬时功率', unit: 'kw', name: 'power', key: '功率', data: 0 }, { title: '瞬时压力', unit: 'bar', name: 'pressure', key: '压力', data: 0 }, { title: '瞬时单耗', unit: 'kwh/m³', name: 'unitCost', key: '单耗', data: 0 },]
    props.project && Axios.post(baseUrl + "/getRealtimeSummary", {
      project: props.project['projectNameEn']
    }).then(res => {
      let resData = res.data
      newCardData.map(data => {
        data['data'] = resData[data['key']]
        return null
      })
      setCardData(newCardData)
    }).catch(err => {
      newCardData.map(data => {
        data['data'] = "无"
        return null
      })
      setCardData(newCardData)
      enqueueSnackbar("实时概览数据获取出错，请重新登陆或联系管理员", { variant: 'error' })
      return []
    })
  }, [enqueueSnackbar, props.project])

  // 获取表格数据
  const getSummaryData = useCallback(() => {
    props.project && Axios.post(baseUrl + "/listRealTimeDataCache", {
      project: props.project["projectNameEn"]
    }).then(res => {
      setTableData(res.data)
    }).catch(err => {
      enqueueSnackbar("实时数据获取出错，请重新登陆或联系管理员", { variant: 'error' })
      return {}
    })
  }, [enqueueSnackbar, props.project])

  // 初始化以及项目更改时获取数据
  useEffect(() => {
    getTableData()
    getSummaryData()
    const intervalId = setInterval(() => {
      getTableData()
      getSummaryData()
    }, 10 * 1000);
    return () => clearInterval(intervalId) // 卸载时销毁定时器防止内存泄露
  }, [props, getSummaryData, getTableData])

  return (
    <div className={classes.root}>
      <div className={classes.boxTop} id="realtime-summary">
        {cardData.map((data, index) =>
          <Card key={index} data={data}></Card>
        )}
      </div>
      <div className={classes.boxBottom} id="realtime-machine">
        {Object.keys(tableData).sort().map((data, index) =>
          <Table key={index} tableTitle={data} data={tableData[data]}></Table>
        )}
      </div>
    </div>
  )
}

export default Realtime;