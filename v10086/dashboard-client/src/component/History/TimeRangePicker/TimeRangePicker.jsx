import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { HistoryContext } from '@context/HistoryContext'
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

const useStyles = makeStyles({
  timePicker: {
    margin: '0 15px',
    "& label": {
      color: 'rgb(86,95,111)',
    },
    '& .MuiInputBase-input': {
      padding: '10px'
    },
    '& .MuiInputBase-formControl': {
      outline: 'none'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(4,78,139,0.9) !important'
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(4,78,139,1)'
      }
    },
    "& .Mui-focused": {
      color: '#fff',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(4,78,139,0.9)'
      },
    },
    "& input": {
      color: 'rgb(86,95,111)',
      "&:focus": {
        color: '#fff'
      }
    },
  }
})
const materialTheme = createMuiTheme({
  overrides: {
    // 日期选择框
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: 'rgba(4,78,139,0.9) !important'
      },
      input: {
        padding: '10px'
      },
    },
    // 日期时间按钮
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: 'rgb(14,27,49)',
      },
    },
    // 日期时间图标
    MuiPickerDTTabs: {
      tabs: {
        backgroundColor: 'rgb(14,27,49)',
      }
    },
    // 日历视图
    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: 'rgb(10,23,46)',
      }
    },
    // 月份切换按钮
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: 'rgba(255, 255, 255, 0.54)'
      },
      iconButton: {
        backgroundColor: 'rgb(10,23,46)',
        '& span': {
          color: 'rgba(255, 255, 255, 0.54)'
        }
      },
      daysHeader: {
        '& span': {
          color: 'rgba(232, 230, 227, 0.38)'
        }
      }
    },
    // 日期选择
    MuiPickersDay: {
      day: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
      daySelected: {
        backgroundColor: lightBlue["400"],
        '&:hover': {
          backgroundColor: lightBlue["900"]
        }
      },
      dayDisabled: {
        color: lightBlue["100"],
      },
      current: {
        color: lightBlue["900"],
      },
    },
    MuiPickersModal: {
    },
    // 确认/取消按钮区域
    MuiDialogActions: {
      spacing: {
        backgroundColor: 'rgb(10,23,46)',
      }
    },
    // 按钮
    MuiButton: {
      textPrimary: {
        color: lightBlue["400"]
      }
    },
    // 时间选择
    MuiPickersClock: {
      clock: {
        // 数字颜色
        '& span': {
          color: 'rgba(255, 255, 255, 0.54)'
        }
      },
      // 时钟圆心
      pin: {
        backgroundColor: lightBlue["400"],
      }
    },
    // 时间选中样式
    MuiPickersClockPointer: {
      // 时钟指针
      pointer: {
        backgroundColor: lightBlue["400"]
      },
      thumb: {
        backgroundColor: '#fff',
        borderColor: lightBlue["400"]
      }
    },
    MuiPickersClockNumber: {
      clockNumberSelected: {
        backgroundColor: lightBlue["400"]
      }
    }
  },
});
export default function TimeRangePicker() {
  const classes = useStyles()
  const historyContext = useContext(HistoryContext);
  return (
    <div id="history-time-picker">
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            className={classes.timePicker}
            inputVariant="outlined"
            label="开始时间"
            ampm={false}
            showTodayButton
            value={historyContext.state.startTime * 1000}
            format="yyyy年MM月dd日 HH:mm"
            autoOk
            onChange={(date) => { historyContext.handleStartTime(date / 1000) }}
          />
        </MuiPickersUtilsProvider>
        <span>至</span>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            className={classes.timePicker}
            inputVariant="outlined"
            label="结束时间"
            ampm={false}
            showTodayButton
            value={historyContext.state.endTime * 1000}
            format="yyyy年MM月dd日 HH:mm"
            autoOk
            onChange={(date) => { historyContext.handleEndTime(date / 1000) }}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  )
}
