import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';

const useStyles = theme => ({
  tabsBox: {
    background: 'transparent',
  },
  tabs:{
    borderRadius:'8px',
    backgroundColor:'rgb(10,31,60)',
    marginRight:'10px',
    marginBottom:'10px',
    color:'rgb(204,206,210)',
    fontSize:'1vmax',
    fontWeight:'600'
  },
  tabsOn:{
    position:'relative',
    borderTopRightRadius:'8px',
    borderTopLeftRadius:'8px',
    backgroundColor:'rgb(14,27,49)',
    marginRight:'10px',
    marginBottom:'10px',
    border:'2px solid rgb(4,78,139)',
    borderBottom:'2px solid transparent',
    color:'rgb(255,255,255)',
    fontSize:'1vmax',
    fontWeight:'600',
    overflow:'unset',
    '&:before':{
      position:'absolute',
      content:'""',
      width:'100%',
      height:'14px',
      bottom:'-14px',
      backgroundColor:'rgb(14,27,49)',
      borderLeft:'2px solid rgb(4,78,139)',
      borderRight:'2px solid rgb(4,78,139)',
      borderBottom:'2px solid green',
      zIndex:'999'
    },
  },
  slide: {
    color: '#fff',
    border:'2px solid rgb(4,78,139)',
    backgroundColor: 'rgb(14,27,49)',
    display:'flex',
    padding:'10px',
    borderBottomLeftRadius:'8px',
    borderBottomRightRadius:'8px',
  },
  indicator: {
    display:'none'
  },
  machine:{
    color:'rgb(204,206,210)'
  },
  machineOn:{
    color:'rgb(204,206,210)'
  }
});

class KindTabs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      index: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };


  render() {
    const { index } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Tabs value={index} onChange={this.handleChange} className={classes.tabsBox}
              classes={{ indicator: classes.indicator}}>
          {Object.keys(this.props.machineMap).sort().map( (kind,index) => 
            <Tab key={index} className={index===this.state.index ? classes.tabsOn : classes.tabs} label={kind} />
          )}
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}
          containerStyle={{transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',overflow:'unset'}}>
          {Object.keys(this.props.machineMap).sort().map( (kind,index) => 
            <div key={index} className={classes.slide}>
              {Object.keys(this.props.machineMap[kind]).sort().map( (machine,index) =>
                <Button variant="contained" key={index}>{machine}</Button>
              )}
            </div>
          )}
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(useStyles)(KindTabs);