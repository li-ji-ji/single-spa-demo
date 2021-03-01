import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Axios from 'axios'


import { dateFormat } from '@util/DateUtils';
import Card from '@component/Home/Card'
import Chart from '@component/Home/Chart'
import HomeTable from '@component/Home/Table'
import { ChartError } from '@component/ErrorBoundary'
import { HomeDriver } from '@component/Driver'



const useStyles = makeStyles({
  root: {
    padding: "0 1vw 1vh",
    width: "100%",
    height: "calc(100vh - 64px)",
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'space-evenly'
  },
  boxLeft: {
    width: '73%',
    height: '100%',
    boxSizing: 'border-box'
  },
  boxRight: {
    width: '25%',
    height: '90vh',
    padding: "2vh 0.5vw 1vh",
    boxSizing: 'border-box',
    overflowY: 'hidden'
  },
  cardBox: {
    height: "32vh",
    boxSizing: 'border-box',
    padding: "2vh 0.5vw 1vh",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartBox: {
    height: "58vh",
    boxSizing: 'border-box',
    padding: "1vh 0.5vw",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const baseUrl = "/API/factory/Home"
function Home(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [cardData, setCardData] = useState([
    {
      'kind': "气",
      "summary": 0,
      'name': 'air',
      'color': 'rgb(0,179,255)'
    },
    {
      'kind': "电",
      "summary": 0,
      'name': 'ele',
      'color': 'rgb(62,255,213)'
    },
    {
      'kind': "单耗",
      "summary": 0,
      'name': 'unit',
      'color': 'rgb(123,114,238)'
    }
  ])// 概览数据
  const [range, setRange] = useState('日') // 时间间隔 
  const [timeFormat, setTimeFormat] = useState('dd日HH时') // 日期格式
  const [kind, setKind] = useState('单耗') // 数据种类
  const tableConfig = {
    timestamp: {
      text:'时间',
      unit:''
    },
    电: {
      text:'电',
      unit:'kwh'
    },
    气: {
      text:'气',
      unit:'m³'
    },
    单耗: {
      text:'单耗',
      unit:'kwh/m³'
    }
  } // 表头
  const [mainData, setMainData] = useState([])// 页面总数据
  const [tableData, setTableData] = useState([])// 表格数据
  const [chartData, setChartData] = useState([]) // 图表数据
  const [assistData, setAssistData] = useState([])// 图标辅助数据

  // 使用引导
  useEffect( () => {
    HomeDriver()
  },[])

  // 获取summary数据
  useEffect(() => {
    // 请求数据
    props.project && Axios.post(baseUrl + "/getSummaryData", {
      project: props.project
    }).then(res => {
      let data = res.data
      let newCardData = [{ 'kind': "气", "summary": 0, 'name': 'air', 'color': 'rgb(0,179,255)' }, { 'kind': "电", "summary": 0, 'name': 'ele', 'color': 'rgb(62,255,213)' }, { 'kind': "单耗", "summary": 0, 'name': 'unit', 'color': 'rgb(123,114,238)' }]
      // 遍历赋值
      Object.keys(newCardData).map(e => {
        newCardData[e]['summary'] = data[newCardData[e]['kind']]
        return null
      })
      setCardData(newCardData)
    }).catch(err => {
      enqueueSnackbar("概览数据异常，请重新登陆或联系管理员",{variant:'error'})
      console.log(err)
      return {}
    })

  }, [props, enqueueSnackbar])


  // 获取页面主要数据
  useEffect( () => {
    let rangeUrl = { // 周期对应请求地址
      '日': '/getHoursData/v2',
      '月': '/getDaysData/v2',
      '年': '/getMonthsData/v2'
    }
    let url = baseUrl + rangeUrl[range] // 拼接URL
    props.project && Axios.post(url, {
      project: props.project,
    }).then(res => {
      let data = res.data
      setMainData(JSON.parse(data['dataList']),)
      setAssistData(JSON.parse(data['assistData']))
    }).catch(err => {
      enqueueSnackbar("周期数据异常，请重新登陆或联系管理员",{variant:'error'})
      return []
    })

  },[props,range,enqueueSnackbar])

  // 根据页面数据及时间格式化变化重新渲染表格数据
  useEffect(() => {
      // 为表格格式化数据时间
      let newTableData = JSON.parse(JSON.stringify(mainData))
      newTableData.map(row => {
        row["timestamp"] = dateFormat(timeFormat, new Date(Number(row["timestamp"])))
        return {}
      })
      setTableData(newTableData.reverse())
  },[mainData, timeFormat])

  // 根据周期变换改变时间格式化
  useEffect(() => {
    // 周期对应时间格式
    let rangeFormat = { '日': 'dd日HH时', '月': 'mm月dd日', '年': 'YY年mm月' }
    setTimeFormat(rangeFormat[range])
  },[range])

  // 根据数据种类选择渲染图表
  useEffect( () => {
    if(mainData.length > 0){
      let newChartData = []
      mainData.map(row => {
        newChartData.push([Number(row['timestamp']), row[kind]])
        return null
      })
      setChartData(newChartData)
    }
  },[mainData,kind])
  

  return (
    <div className={classes.root}>
      <div className={classes.boxLeft}>
        <div className={classes.cardBox} id="home-kind-btn">
          {cardData.map((data, index) =>
            <Card handleKind={setKind} key={index} data={data}></Card>//  
          )}
        </div>
        <div className={classes.chartBox}>
          <ChartError>
            <Chart
              title={kind + '/' + range}
              kind={kind} handleRange={setRange}
              range={range} data={chartData}
              assist={assistData[kind]}>
            </Chart>
          </ChartError>
        </div>
      </div>
      <div className={classes.boxRight} id="home-data-table">
        <HomeTable
          tableHeader={tableConfig} range={range} data={tableData} />
      </div>
    </div>
  )

}

export default Home