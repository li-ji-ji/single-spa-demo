import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory, useLocation } from 'react-router-dom'

import _nav from '@util/_nav'
import logo from './static/logo.png'
import logoSmall from './static/logo-small.png'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.normal.itemBgColor,
    color: theme.normal.itemColor,
  },
  logoBox: {
    width: '100%',
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: '27.5px'
  },
  logoSmall: {
    width: '27.5px',
    height: '27.5px'
  },
  sideBarOpen: {
    width: '240px',
    paddingLeft: '20px'
  },
  sidebarClose: {
    width: '60px',
  },
  sideBarItem: {
    width: '100%',
    height: '60px',
    overflow: 'hidden'
  },
  itemActive: {
    width: '100%',
    height: '60px',
    overflow: 'hidden',
    backgroundColor: theme.normal.bgColor,
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    '&:hover': {
      backgroundColor: theme.normal.bgColor,
    }
  },
  sideBarIcon: {
    color: theme.normal.itemColor,
    paddingLeft: '5px',
    boxSizing: 'border-box',
    minWidth: '44px'
  },
  sideBarText: {
    '& span': {
      color: theme.normal.itemColor,
      fontSize: '16px',
      fontWeight: '800',
      lineHeight: '2'
    }
  },
  sideBarTextIn: {
    '& span': {
      color: 'rgb(144,228,255)',
      fontSize: '16px',
      fontWeight: '800',
      lineHeight: '2'
    }
  },
  openBtnBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: 'center'
  }
}));
export default function SideBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  /*---------控制侧边栏----------*/
  // 按钮
  const openIcon = <ListItem className={classes.openBtnBox} button onClick={() => props.setSidebarStatus(false)} ><ChevronLeftIcon /></ListItem>
  const closeIcon = <ListItem className={classes.openBtnBox} button onClick={() => props.setSidebarStatus(true)} ><ChevronRightIcon /></ListItem>
  /*---------控制侧边栏----------*/

  // 路由控制
  const setPath = (path) => {
    history.push(path)
    props.setSidebarStatus(false)
  }

  // 判断当前路由 
  const judgePath = path => {
    return location.pathname === path
  }



  return (
    <Drawer variant="permanent" classes={{ paper: classes.root }}>
      {/* logo */}
      <div className={classes.logoBox}>
        {props.open
          ? <img className={classes.logo} src={logo} alt="" />
          : <img className={classes.logoSmall} src={logoSmall} alt="" />
        }
      </div>
      {/* 侧边栏控制按钮 */}
      <div className={classes.openBtnBox} id="layout-sidebar-show">
        {props.open ? openIcon : closeIcon}
      </div>
      {/* 导航栏 */}
      <List className={props.open ? classes.sideBarOpen : classes.sidebarClose} id="layout-menu">
        {_nav.map(nav =>
          <ListItem
            button key={nav.name} onClick={() => setPath(nav.path)}
            className={location.pathname === nav.path ? classes.itemActive : classes.sideBarItem}
            onMouseEnter={() => console.log("in")}
            onMouseLeave={() => console.log("out")}
          >
            <Tooltip title={nav.name}>
              <ListItemIcon className={classes.sideBarIcon}><img src={judgePath(nav.path) ? nav.iconOn : nav.icon} alt="" /></ListItemIcon>
            </Tooltip>
            <ListItemText className={judgePath(nav.path) ? classes.sideBarTextIn : classes.sideBarText} primary={nav.name} />
          </ListItem>
        )}
      </List>
    </Drawer>
  )
}

