import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { dateFormat } from '@util/DateUtils';

const useStyles = makeStyles({
  root: {
    borderRadius: '15px',
    backgroundColor: 'rgb(15,28,50)',
    padding: '0.5vh 1vw',
    boxShadow: 'none',
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'start',
    padding: "1vh 1vw"
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
      left: '-16px',
      transform: 'translateY(-50%)'
    },
  },
  noData:{
    height:'270px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:'24px',
    color: '#fff',
  },
  tableCell: {
    position: 'relative',
    width: '20%',
    fontSize: '0.8vw',
    color: '#fff',
    borderBottom: '0.5px solid rgb(53,65,85)',
    paddingTop: '3px',
    paddingBottom: '3px'
  },
  tableRowBlue: {
    color: '#fff',
    backgroundColor: 'rgb(13,32,61)'
  },
  table: {
    tableLayout:'fixed',
    fontSize: '0.5vmax',
    '& tbody': {
      display: 'block',
      maxHeight: '65vh',
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
  statusIcon: {
    position: 'absolute',
    marginLeft: "10px",
    top: '50%',
    transform: 'translateY(-50%) scale(1.5)'
  }
});
export default function ReportTable(props) {
  const classes = useStyles();


  return (
    <Paper className={classes.root}>
      <div className={classes.titleBox}>
        <span className={classes.title}>数据报表</span>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {Object.keys(props.TableHeader).map((header, index) =>
              <TableCell className={classes.tableCell} key={index} align="left">{header}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.data.length === 0
              ? <div className={classes.noData}>暂无数据</div>
              : props.data.map((row, index) =>
                <TableRow key={index} className={index % 2 === 0 ? classes.tableRowBlue : null}>
                  {Object.values(props.TableHeader).map((col, colIndex) =>
                    col === 'timestamp'
                      ? <TableCell className={classes.tableCell} key={colIndex} align="left">{dateFormat(props.formatStr, new Date(Number(row[col])))}</TableCell>
                      : <TableCell className={classes.tableCell} key={colIndex} align="left">{row[col]}</TableCell>
                  )}
                </TableRow>)
          }

        </TableBody>
      </Table>
    </Paper>
  );
}
