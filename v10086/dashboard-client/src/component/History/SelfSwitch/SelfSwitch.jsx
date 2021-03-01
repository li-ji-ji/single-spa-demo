import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root:{
    height:'34px',
    width:'80px',
    position:"relative",
    backgroundColor:props => props.checked ? 'rgb(2,209,255)' : theme.palette.common.white,
    borderRadius:'17px',
    fontWeight:'400',
    color:'#000'
  },
  btn:{
    position:'absolute',
    backgroundColor:props => props.checked ? theme.palette.common.white : '#c5c5c5' ,
    height:'30px',
    width:'50px',
    borderRadius:'20px',
    top:'50%',
    transform:'translateY(-50%)',
    left:props => props.checked ? '28px' : '2px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:'0.8rem',
    transition: theme.transitions.create(['background-color', 'border']),
    userSelect: 'none',
  }
}))

export default function SelfSwitch(props) {
  const classes = useStyles(props)

  return (
    <div className={classes.root} onClick={props.active}>
      <span className={classes.btn}>{props.checked ? '已开启' : '所有'}</span>
    </div>
  )
}

