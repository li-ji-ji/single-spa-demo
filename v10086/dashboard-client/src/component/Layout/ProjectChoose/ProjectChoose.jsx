import React,{ useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

import { LayoutContext } from '@context/LayoutContext'

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
  root:{
    backgroundColor:"transparent",
    boxShadow:"none",
    fontSize:'1vmax',
    fontWeight:'800',
    '&:hover':{
      backgroundColor:"transparent",
      boxShadow:"none",
    },
  }
}))

export default function ProjectChoose(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const layoutContext = useContext(LayoutContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.root}
        id="layout-project-picker"
      >
        {layoutContext.state.projectName}
        <ExpandMoreOutlinedIcon/>
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        autoFocus={false}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        { Object.keys(layoutContext.state.projectMap).map( (project,index) => 
          <StyledMenuItem key={index} onClick={() => {layoutContext.setProject(layoutContext.state.projectMap[project],project);handleClose()}}>
            <ListItemText primary={project} />
          </StyledMenuItem>
        )}
      </StyledMenu>
    </div>
  );
}
