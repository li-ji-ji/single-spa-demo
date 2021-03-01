import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root:{
    width:'23%',
    height:'98%',
    position:'relative',
    backgroundRepeat:'no-repeat',
    backgroundSize:'100% 100%',
    borderRadius:'15px',
    boxShadow:'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    backgroundImage:props => {
      const bg = require(`./static/bg-${props.data.name}.png`)
      return `url(${bg})`
    },
  },
  box:{
    position:'absolute',
    top:'50%',
    left:'60%',
    transform:'translate(-50%,-50%)',
    display:'flex',
    flexDirection:"column",
  },
  icon:{
    position:'absolute',
    height:'50%',
    top:'50%',
    left:'8%',
    transform:'translateY(-50%)'
  },
  title:{
    color:'rgb(253,253,253)',
    fontSize:'1.2vmax',
    paddingBottom:'12px',
    boxSizing:'border-box',
    display:'flex',
  },
  dataBox:{
    display:'flex',
    alignItems:'flex-end'
  },
  data:{
    fontSize:'1.8vmax',
    color:'rgb(18,150,219)',
    lineHeight:1
  },
  unit:{
    fontSize:'0.8vmax',
    color:'rgb(253,253,253)',
    paddingLeft:'10px',
    boxSizing:'border-box'
  }
})

export default function Card(props) {
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <img className={classes.icon} src={require(`./static/${props.data.name}.png`)} alt=""/>
      <div className={classes.box}>
        <span className={classes.title}>{props.data.title}</span>
        <div className={classes.dataBox}>
          <span className={classes.data}>{props.data.data}</span>
          <span className={classes.unit}>{props.data.unit}</span>
        </div>
      </div>
    </div>
  )
}
