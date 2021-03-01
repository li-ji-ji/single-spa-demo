import React, { useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

import { HistoryContext } from '@context/HistoryContext'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    '&:focus': {
      backgroundColor: 'rgb(2,209,255)',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    border: '1px solid rgba(4,78,139,0.9)',
    boxShadow: "none",
    fontSize: '0.8vmax',
    fontWeight: '800',
    '&:hover': {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  }
}))

export default function DownSampleChoose(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const historyContext = useContext(HistoryContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div id="history-downSample">
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.root}
      >
        {/* 当前选中的降采样 */}
        {historyContext.state.downSample[0]}
        <ExpandMoreOutlinedIcon />
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        autoFocus={false}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* 降采样列表 */}
        {historyContext.state.downSampleList && historyContext.state.downSampleList.length > 0
          && historyContext.state.downSampleList.map((downSample, index) =>
            <StyledMenuItem key={index} onClick={() => { historyContext.handleDownSample(downSample); handleClose() }}>
              <ListItemText primary={downSample[0]} />
            </StyledMenuItem>
          )}
      </StyledMenu>
    </div>
  );
}
