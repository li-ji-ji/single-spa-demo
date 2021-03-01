import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
  pageInput: {
    width: "60px",
    marginLeft: '10px',
    // 输入框样式重写
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
  },
  rowNumInput:{
    width:"80px",
    textAlign: 'left',
    '& .MuiInputBase-input':{
      color: 'rgb(86,95,111)',
      "&:focus": {
        color: '#fff'
      }
    }
  },
  // 跳转按钮样式重写
  jumpBtn: {
    marginLeft: "10px",
    color: '#fff',
    borderColor: 'rgba(4,78,139,0.9)',
    '&:hover': {
      border: '1px solid rgba(4,78,139,1)',
    }
  },
  // 页码选择器样式重写
  pagination: {
    '& .MuiPaginationItem-page': {
      color: '#fff'
    },
    '& .MuiPaginationItem-outlined': {
      borderColor: 'rgba(4,78,139,0.9)'
    },
    '& .Mui-selected': {
      background: 'rgba(4,78,139,0.5)'
    }
  }
});
export default function PageHelper(props) {
  const classes = useStyles();
  const [pageInput, setPageInput] = useState(1)

  return (
    <div className={classes.root}>

      <FormControl variant="outlined" className={classes.pageInput+" "+classes.rowNumInput}>
        <InputLabel>行数</InputLabel>
        <Select
          value={props.rowNum}
          onChange={props.handleRowNum}
          label="行数"
        >
          <MenuItem value={10}>10行</MenuItem>
          <MenuItem value={20}>20行</MenuItem>
          <MenuItem value={30}>30行</MenuItem>
          <MenuItem value={props.allRowNum}>全部</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="standard-basic" variant="outlined"
        InputLabelProps={{ shrink: true, }}
        size="small" className={classes.pageInput} type="number"
        value={pageInput} onChange={(e) => setPageInput(e.target.value)}
        label="页码" />
      <Button variant="outlined" className={classes.jumpBtn}
        color="primary"
        onClick={() => props.setPage(pageInput)}>跳转
      </Button>
      <Pagination
        className={classes.pagination}
        count={Number(props.pageCount)} variant="outlined" page={Number(props.page)}
        color="primary" shape="rounded"
        onChange={(e, page) => props.setPage(page)} />
    </div>
  )
}
