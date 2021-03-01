import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';

import ProjectChoose from '@component/Layout/ProjectChoose'
import userIcon from './static/user-icon.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: theme.normal.bgColor,
    boxShadow: 'none'
  },
  title: {
    backgroundColor: theme.normal.bgColor,
    flexGrow: 1,
    fontSize: '1.5vmax',
    fontWeight: '800',
    color: 'rgb(2,209,255)',
    display: "flex",
    justifyContent: 'center',
    alignItems: "center"
  },
  user: {
    fontSize: '1.2rem',
    boxSizing: 'border-box',
    padding: '0 20px 0 10px'
  },
  resetDriverBtn: {
    color: 'rgb(2,209,255)',
    fontWeight: '600',
    fontSize: '0.6vmax',
  },
  logoutBtn: {
    backgroundColor: 'rgb(2,209,255)',
    color: '#fff',
    fontWeight: '600',
    fontSize: '0.6vmax',
    '&:hover': {
      backgroundColor: 'rgb(2,209,255)',
    }
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const user = window.sessionStorage.getItem("user")

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            兆瓴数据平台 —
            <ProjectChoose />
          </Typography>
          <Tooltip title="重启使用教程引导">
            <IconButton id="layout-reset-driver" color="primary" title="重启使用教程引导" component="span" className={classes.resetDriverBtn} onClick={props.resetDriver}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <img src={userIcon} alt="" />
          <span className={classes.user}>{user}</span>
          <Button id="layout-logout-btn" className={classes.logoutBtn} onClick={props.logout}>注销</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
