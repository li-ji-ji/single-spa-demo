import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlashOnIcon from '@material-ui/icons/FlashOn';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  btn: {
    borderRadius: '6px',
    backgroundColor: 'rgb(11,24,46)',
    marginRight: '10px',
    marginBottom: '10px',
    color: 'rgb(204,206,210)',
    fontSize: '1vw',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    '&:hover': {
      backgroundColor: 'rgb(11,24,46)',
      opacity: '0.95'
    }
  },
  btnOn: {
    borderRadius: '6px',
    backgroundColor: 'rgb(0,179,255)',
    marginRight: '10px',
    marginBottom: '10px',
    color: 'rgb(255,255,255)',
    fontSize: '1vw',
    '&:hover': {
      backgroundColor: 'rgb(0,179,255)',
      opacity: '0.95'
    }
  },
  statusOpen: {
    color: 'rgb(248,14,69)',
  },
  statusClose: {
    color: 'rgb(32,237,192)',
  }
})

export default function BtnTabs(props) {
  const classes = useStyles()


  return (
    <div className={classes.root}>
      {Object.keys(props.btnList).map((btn, index) =>
        // 判断是否只显示开启状态设备
        props.onlyOpen ?
          props.machineStatus[props.btnList[btn]] && <Button
            className={btn === props.on ? classes.btnOn : classes.btn}
            key={index} onClick={() => props.action(btn)}>
            {btn}
            {/* 存在机器状态则显示指示灯 */}
            {props.machineStatus &&
              <FlashOnIcon className={props.machineStatus[props.btnList[btn]] ? classes.statusClose : classes.statusOpen}></FlashOnIcon>
            }
          </Button>
          :
          <Button
            className={btn === props.on ? classes.btnOn : classes.btn}
            key={index} onClick={() => props.action(btn)}>
            {btn}
            {/* 存在机器状态则显示指示灯 */}
            {props.machineStatus &&
              <FlashOnIcon className={props.machineStatus[props.btnList[btn]] ? classes.statusClose : classes.statusOpen}></FlashOnIcon>
            }
          </Button>
      )}
    </div>
  )
}
