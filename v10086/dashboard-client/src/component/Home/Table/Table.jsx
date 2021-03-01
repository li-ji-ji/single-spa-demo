import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    borderRadius: '15px',
    backgroundColor: 'rgb(15,28,50)',
    height: '100%',
    padding: '0.3vw',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'start',
    padding: "2vh 1.5vw"
  },
  title: {
    fontSize: '1.2vmax',
    color: '#fff',
    position: 'relative',
    '&::before': {
      position: 'absolute',
      content: '""',
      display: 'block',
      backgroundColor: 'rgb(0,215,255)',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      top: '50%',
      left: '-10%',
      transform: 'translateY(-50%)'
    },
  },
  tableHeaderCell: {
    color: '#fff',
    fontSize: '1vw',
    borderBottom: '0.5px solid rgb(53,65,85)',
    padding: '10px 2px',
    whiteSpace:'nowrap',
    position:'relative'
  },
  tableHeaderUnit:{
    position:'absolute',
    fontSize:'0.5vw',
    top:0
  },
  tableCell: {
    color: '#fff',
    fontSize: '0.9vw',
    borderBottom: '0.5px solid rgb(53,65,85)',
    padding: '10px 2px'
  },
  tableRowBlue: {
    color: '#fff',
    backgroundColor: 'rgb(13,32,61)'
  },
  table: {
    fontSize: '0.5vmax',
    '& tbody': {
      display: 'block',
      height: '72vh',
      overflowY: 'scroll',
    },
    '& thead': {
      display: 'table',
      width: '100%',
      tableLayout: 'fixed',
      border: 'none',
    },
    '& tr': {
      display: 'table',
      width: '100%',
      tableLayout: 'fixed',
      border: 'none',
    }
  },
  noData:{
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:'24px',
    color:'#fff',
  }
});
export default function HomeTable(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.titleBox}>
        <span className={classes.title}>数据列表/{props.range}</span>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {Object.values(props.tableHeader).map((header, index) =>
              <TableCell className={classes.tableHeaderCell} key={index} align="center">
                {header['text']}
                <span className={classes.tableHeaderUnit}>{header['unit']}</span>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.length > 0
            ? props.data.map((row, index) =>
              <TableRow key={index} className={index % 2 === 0 ? classes.tableRowBlue : null}>
                {Object.keys(props.tableHeader).map((col, index) =>
                  <TableCell className={classes.tableCell} key={index} align="center">{row[col]}</TableCell>
                )}
              </TableRow>
            )
            : <div className={classes.noData}>暂无数据</div>}
        </TableBody>
      </Table>
    </Paper>
  );
}
