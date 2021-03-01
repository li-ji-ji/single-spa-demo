import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ApexChart from "react-apexcharts";
import bg from './static/bg.png'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '35vh',
    position: 'relative',
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    overflow: 'hidden',
    borderRadius: '15px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  title: {
    position: 'absolute',
    fontSize: '1vmax',
    color: '#fff',
    top: '2vh',
    left: '2vw',
    '&::before': {
      position: 'absolute',
      content: '""',
      display: 'block',
      backgroundColor: 'rgb(0,215,255)',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      top: '50%',
      left: '-12px',
      transform: 'translateY(-50%)'
    },
  },
  rangeBtnGroup: {
    position: 'absolute',
    top: '5vh',
    left: "50%",
    transform: "translateX(-50%)",
  },
  btn: {
    outline: "none",
    border: "1px solid transparent !important",
    boxSizing: 'border-box',
    color: '#fff',
    "&:hover": {
      outline: "none",
      border: "0px",
      boxSizing: 'border-box',
    }
  },
  btnActive: {
    border: "1px solid rgb(6,149,183) !important",
    color: '#fff',
    borderRadius: '2px !important',
    "&:hover": {
      outline: "none",
      border: "1px solid rgb(6,149,183) !important",
      boxSizing: 'border-box',
    }
  },
  chart: {
    width: '96%',
    position: 'absolute',
    left: '50%',
    bottom: '0',
    transform: 'translateX(-50%)'
  }
});

export default function Chart(props) {
  const classes = useStyles(props);

  // 数据格式化，千以上转换为k
  const formatValue = (value) => {
    if (value >= 1000 && value % 1000 === 0) return ((value / 1000).toFixed(0) + "k")
    if (value >= 1000 && value % 1000 !== 0) return ((value / 1000).toFixed(2) + "k")
    if (value < 1000 && value >= 10) return ((Number(value)).toFixed(0))
    if (value < 10 && value > 5) return ((Number(value)).toFixed(1))
    if (value <= 5 && value > 0) return ((Number(value)).toFixed(3))
    else return (value)
  }


  const series = [{
    name: props.kind,
    data: props.data ? props.data : [],
  }]
  const options = {
    dataLabels: {
      enabled: false
    },
    // 工具栏
    chart: {
      id:props.kind && props.kind,
      group:'report',
      toolbar: {
        export: {
          csv: {
            filename: props.kind,
            columnDelimiter: ',',
            headerCategory: '时间',
            headerValue: '数据',
            dateFormatter(timestamp) {
              let date = new Date(timestamp + 8 * 3600 * 1000)
              return date.toJSON().substr(0, 19).replace('T', ' ')
            }
          }
        },
      }
    },
    // 颜色
    colors: ['rgb(0,206,253)'],
    // 横轴样式
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        style: {
          colors: "rgb(146,146,154)",
          fontSize: "14px"
        }
      }
    },
    // 纵轴样式
    yaxis: {
      show: true,
      forceNiceScale: true,
      min: props.assist && props.assist.min.data * 0.95,
      max: props.assist && props.assist.max.data * 1.05,
      labels: {
        minWidth: '0px',
        style: {
          colors: "rgb(146,146,154)",
          fontSize: "14px"
        },
        formatter: (value) => formatValue(value),
        forceNiceScale: true
      }
    },
    grid: {
      show: false,
    },
    fill: {
      type: ['gradient'],
      colors: ['rgb(1,198,244)'],
      gradient: {
        shade: 'dark',
        type: "vertical",
        stops: [50, 75, 100],
      },
    },
    tooltip: {
      x: {
        format: "yyyy-MM-dd HH:mm"
      },
      y: {
        formatter: function (value) {
          return value.toFixed(3)
        }
      },
      "theme": "dark",
    },
    // annotations: {
    //   yaxis: [{
    //     y: props.assist && props.assist.avg,
    //     borderColor: '#00E396',
    //     label: {
    //       borderColor: '#00E396',
    //       style: {
    //         color: '#fff',
    //         background: '#00E396',
    //       },
    //       text: `平均值 ${props.assist && props.assist.avg}` ,
    //     }
    //   }],
    // points: [{
    //   x: props.assist && Number(props.assist.min.time),
    //   y: props.assist && Number(props.assist.min.data),
    //   yAxisIndex: 0,
    //   seriesIndex: 0,
    //   marker: {
    //     size: 4,
    //     fillColor: "#00E396",
    //     strokeColor: "#00E396",
    //     strokeWidth: 3,
    //   },
    //   label: {
    //     borderColor: '',
    //     text: `最小值 ${props.assist && props.assist.min.data}`,
    //     textAnchor: 'middle',
    //     offsetY: -10,
    //     style: {
    //       background: 'rgb(29,31,44)',
    //       color: '#777',
    //     },
    //   }
    // },{
    //   x: props.assist && Number(props.assist.max.time),
    //   y: props.assist && Number(props.assist.max.data),
    //   yAxisIndex: 0,
    //   seriesIndex: 0,
    //   marker: {
    //     size: 4,
    //     fillColor: "#00E396",
    //     strokeColor: "#00E396",
    //     strokeWidth: 3,
    //   },
    //   label: {
    //     borderColor: '',
    //     text: `最大值 ${props.assist && props.assist.max.data}`,
    //     textAnchor: 'middle',
    //     offsetY: -10,
    //     style: {
    //       background: 'rgb(29,31,44)',
    //       color: '#777',
    //     },
    //   }
    // }],
    // }
  }

  React.useEffect( () => {
    return( () => {
      window.ApexCharts.exec(props.kind,'updateOptions',options)
    })
  },[])  // eslint-disable-line

  return (
    <div className={classes.root}>
      <span className={classes.title}>{props.title}</span>
      <ApexChart className={classes.chart} options={options} series={series} type="area" height='80%' />
    </div>
  )
}
