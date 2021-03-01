import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root:{
    borderRadius:'15px',
    backgroundColor:'rgb(15,28,50)',
    padding:'1.5vw',
    marginBottom:'15px',
    boxShadow:'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  titleBox:{
    display:'flex',
    justifyContent:'start',
    padding:"1vh 1vw"
  },
  title:{
    fontSize: '1.2vmax',
    color: '#fff',
    position:'relative',
    '&::before': {
      position: 'absolute',
      content: '""',
      display: 'block',
      backgroundColor: 'rgb(0,215,255)',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      top: '50%',
      left: '-16px',
      transform: 'translateY(-50%)'
    },
  },
  tableCell:{
    position:'relative',
    fontSize:'1vw',
    color:'#fff',
    borderBottom:'0.5px solid rgb(53,65,85)'
  },
  tableRowBlue:{
    color:'#fff',
    backgroundColor:'rgb(13,32,61)'
  },
  table:{
    fontSize: '0.5vmax',
    tableLayout:'fixed'
  },
  statusIcon:{
    position:'absolute',
    marginLeft:"10px",
    top:'50%',
    transform:'translateY(-50%) scale(1.5)'
  }
});
export default function RealtimeTable(props) {
  const classes = useStyles();


  return (
    <Paper className={classes.root}>
      <div className={classes.titleBox}>
        <span className={classes.title}>{props.tableTitle}</span>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.data.title.map((header, index) =>
              <TableCell className={classes.tableCell} key={index} align="left">{header}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.data.map( (row,index) => 
            <TableRow key={index} className={index%2===0?classes.tableRowBlue:null}>
              {props.data.title.map((col, index) => 
                col === '状态'
                ? <TableCell className={classes.tableCell} key={index} align="left">
                    { row[col]?'开启':'关闭'}
                    <img className={classes.statusIcon} src={require(`./static/${row[col]?'open':'close'}.png`)} alt=""/>
                  </TableCell>
                : <TableCell className={classes.tableCell} key={index} align="left">{row[col]}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
