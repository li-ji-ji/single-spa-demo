import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root:{
    position:'relative',
    height:"100%",
    width:"30%",
    backgroundColor:'rgb(15,29,51)',
    borderRadius:'15px',
    backgroundRepeat:"no-repeat",
    backgroundPositionX:"center",
    backgroundPositionY:"bottom",
    backgroundSize:'100% 80%',
    boxShadow:'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    backgroundImage:props => {
      const bg = require(`./static/bg-${props.data.name}.png`)
      return `url(${bg})`
    },
  },
  ball:{
    width:'80%',
    position:'absolute',
    borderRadius:"50%",
    top:'50%',
    left:'50%',
    transform: "translate(-50%, -58%)",
    animation: '$ball 3s linear 0s infinite alternate',
  },
  '@keyframes ball':{
    '0%':{top:'49%'},
    '20%':{top:'50%'},
    '40%':{top:'51%'},
    '60%':{top:'52%'},
    '80%':{top:'51%'},
    '100%':{top:'50%'}
  },
  kind:{
    position:'absolute',
    fontSize:'1.6vw',
    fontWeight:'800',
    top:'1vh',
    left:'1.5vw',
    color: props => props.data.color
  },
  summary:{
    fontSize:'1.6vw',
    position:'absolute',
    fontWeight:'800',
    top:'3vh',
    left:'50%',
    transform:'translateX(-50%)',
    color: props => props.data.color
  }
});

export default function Card(props) {
  const classes = useStyles(props);
  const ball = require(`./static/ball-${props.data.name}.png`)
  
  return (
    <div onClick={() => props.handleKind(props.data.kind)} className={classes.root}>
      <img className={classes.ball} src={ball} alt=""/>
      <span className={classes.kind}>{props.data.kind}</span>
      <span className={classes.summary}>{props.data.summary}</span>
    </div>
  )
}
