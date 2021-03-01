import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSnackbar } from 'notistack';
import Axios from 'axios'


import { ReportToCsv } from '@util/ExportFile';
import TimeRangePicker from '@component/Report/TimeRangePicker'
import Table from '@component/Report/Table'
import PageHelper from '@component/Report/PageHelper'
import Chart from '@component/Report/Chart'
import TypeChoose from '@component/Report/TypeChoose'
import { ChartError } from '@component/ErrorBoundary'
import { ReportDriver } from '@component/Driver'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    padding: "2vh 1.5vw 1vh",
    boxSizing: 'border-box',
    overflowY: 'scroll',
    overflowX: 'hidden',
    borderRadius: '15px',
    flexDirection: 'column',
    justifyContent: 'start'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    borderRadius: '15px !important',
    backgroundColor: 'rgb(14,27,49)',
    padding: '0.5vh 1vw',
    marginBottom: '10px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    "& .MuiFormGroup-root": {
      display: 'inline-flex',
      color: '#fff'
    },
    '& .MuiRadio-root': {
      color: '#fff'
    },
    '& .Mui-checked': {
      color: 'rgba(4,78,139,0.9)'
    }
  },
  headerNormal: {
    display: 'flex',
    alignItems: 'center',
    "& .MuiAccordionSummary-root": {
      padding: '0',
      display: 'inline-block'
    }
  },
  headerMore: {
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    padding: '0 90px'
  },
  title: {
    fontSize: '1vmax',
    color: '#fff',
    top: '2vh',
    left: '2vw',
    marginRight: '20px'
  },
  getDataBtn: {
    margin: '0 10px',
    backgroundColor: 'rgb(2,209,255)',
    color: '#efefef',
    fontWeight: '800',
    fontSize: '0.8vmax',
    '&:hover': {
      backgroundColor: 'rgb(2,209,255)',
    }
  },
  tableBox: {
    position: 'relative',
    minHeight: '380px',
    borderRadius: '15px',
    backgroundColor: 'rgb(15,28,50)',
    paddingBottom:'80px',
    marginBottom: '10px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  pageHelperBox: {
    position: 'absolute',
    left: '50%',
    bottom: '10px',
    transform: 'translateX(-50%)'
  },
  chartBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px 20px',
    width: '100%'
  }
})

const TableHeader = {
  '时间': 'timestamp',
  '气量(m³)': '气',
  '电量(kwh)': '电',
  '单耗(kwh/m³)': '单耗'
}


const baseUrl = "/API/factory/Report"
function Report(props) {

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [start, setStart] = useState(new Date().getTime() - 24 * 3600 * 1000)
  const [end, setEnd] = useState(new Date().getTime())
  const [type, setType] = useState(['小时', 'hour'])
  const [tableData, setTableData] = useState([])
  const [pageData, setPageData] = useState([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState()
  const [rowNum, setRowNum] = useState(10)
  const [chartDataMap, setChartDataMap] = useState({})
  const [recentlyType, setRecentlyType] = useState('本日')
  const [more, setMore] = useState(false)
  const [formatStr, setFormatStr] = useState("YYYY-mm-dd HH:MM")

  // 使用引导
  useEffect(() => {
    ReportDriver()
  },[])

  // 控制行数
  const handleRowNum = event => {
    setRowNum(event.target.value)
    setPage(1)
  }

  // 选择周期种类
  const chooseType = value => {
    switch (value) {
      case "月":
        setType(['月', 'month'])
        break;
      case "日":
        setType(['日', 'day'])
        break;
      case "小时":
      default:
        setType(['小时', 'hour'])
        break;
    }
  }

  // 根据周期种类选择日期格式化
  const formatChoose = type => {
    switch (type) {
      case "month":
        setFormatStr("YYYY-mm")
        break;
      case "day":
        setFormatStr("YYYY-mm-dd")
        break;
      case "hour":
      default:
        setFormatStr("YYYY-mm-dd HH:MM")
        break;
    }
  }

  // 根据种类查询本日/月/年数据
  const getRecentlyData = event => {
    setRecentlyType(event.target.value)
  }

  // 本日/月/年种类更改触发查询
  useEffect(() => {
    let end = new Date().getTime()
    let start = end - 24 * 3600 * 1000
    let type = 'hour'
    switch (recentlyType) {
      case '本年':
        start = new Date(new Date(new Date(new Date().setMonth(1)).setDate(1)).setHours(0, 0, 0, 0)).getTime()
        type = 'month'
        break;
      case '本月':
        start = new Date(new Date(new Date().setDate(1)).setHours(0, 0, 0, 0)).getTime()
        type = 'day'
        break;
      case '本日':
      default:
        start = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
        type = 'hour'
        break;
    }
    props.project && Axios.post(baseUrl + "/getByRangeAndType", {
      start: start,
      end: end,
      project: props.project['projectNameEn'],
      type: type
    }).then(res => {
      let data = res.data
      setTableData(data)
      getChartData(data)
      formatChoose(type)
    }).catch( err => {
      enqueueSnackbar(err.response.data,{variant:'error'});
    })
  }, [recentlyType, enqueueSnackbar, props])

  // 导出报表
  const exportData = () => {
    let project = props['project']['projectNameEn']
    ReportToCsv(project, tableData)
  }

  // 根据时间查询数据
  const getData = () => {
    Axios.post(baseUrl + "/getByRangeAndType", {
      start: start,
      end: end,
      project: props['project']['projectNameEn'],
      type: type[1]
    }).then(res => {
      let data = res.data
      setTableData(data)
      getChartData(data)
      formatChoose(type[1])
    }).catch( err => {
      enqueueSnackbar(err.response.data,{variant:'error'});
    })
  }


  // 解析数据为图表数据
  const getChartData = data => {
    let chartDataMap = {}
    if (data.length > 0) {
      Object.keys(data[0]).map(e => {
        if (e !== 'timestamp') chartDataMap[e] = []
        return null
      })
    }
    data.map(row => {
      Object.keys(chartDataMap).map(key => {
        chartDataMap[key].push([Number(row['timestamp']), row[key]])
        return null
      })
      return null
    })
    setChartDataMap(chartDataMap)
  }


  // 根据页码设置页数据，源数据或页码发生更改则重新设置页数据
  const setTablePageData = useCallback(() => {
    setPageData(JSON.parse(JSON.stringify(tableData.slice((page - 1) * rowNum, page * rowNum))))
  }, [page, tableData, rowNum])

  // 根据页码设置页数据
  useEffect(() => {
    setTablePageData()
  }, [setTablePageData])

  // 重置页码，表格源数据发生变化重置页码
  useEffect(() => {
    setPage(1)
  }, [tableData])

  // 设置页数，表格源数据发生变化更改页数
  useEffect(() => {
    setPageCount(Math.ceil(tableData.length / rowNum))
  }, [tableData, rowNum])
  



  return (
    <div className={classes.root}>
      <Accordion className={classes.header}>
        <div className={classes.headerNormal}>
          <span className={classes.title}>选择时间:</span>
          <RadioGroup row value={recentlyType} onChange={getRecentlyData} id="report-range-picker">
            <FormControlLabel value="本日" control={<Radio color="primary" />} label="本日" />
            <FormControlLabel value="本月" control={<Radio color="primary" />} label="本月" />
            <FormControlLabel value="本年" control={<Radio color="primary" />} label="本年" />
          </RadioGroup>
          <AccordionSummary>
            <IconButton onClick={() => setMore(!more)} id="report-show-more">
              {more ? <KeyboardArrowUpIcon style={{ color: '#fff' }} /> : <KeyboardArrowDownIcon style={{ color: '#fff' }} />}
            </IconButton>
          </AccordionSummary>
        </div>
        <AccordionDetails expanded={more.toString()} className={classes.headerMore}>
          <TimeRangePicker start={start} end={end} setStart={setStart} setEnd={setEnd} />
          <TypeChoose type={type} chooseType={chooseType}></TypeChoose>
          <Button variant="contained" className={classes.getDataBtn} color="primary" onClick={getData}>
            生成报表
          </Button>
          <Button variant="contained" className={classes.getDataBtn} color="primary" onClick={exportData}>
            导出报表
          </Button>
        </AccordionDetails>
      </Accordion>
      <div className={classes.tableBox} id="report-table">
        <Table TableHeader={TableHeader} data={pageData} formatStr={formatStr}></Table>
        <div className={classes.pageHelperBox}>
          <PageHelper pageCount={pageCount} page={page} rowNum={rowNum} allRowNum={tableData.length} handleRowNum={handleRowNum} setPage={(page) => setPage(page)} ></PageHelper>
        </div>
      </div>
      <div className={classes.chartBox} id="report-chart">
        {['气', '电', '单耗'].map((kind, index) =>
          <ChartError key={index}>
            <Chart
              title={kind} kind={kind} data={chartDataMap[kind]}>
            </Chart>
          </ChartError>
        )}
      </div>
    </div>
  )
}

export default Report
