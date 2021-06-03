import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '300px',
    height: '100px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
    [theme.breakpoints.down('xs')]: {
      width: '250px',
    }
  },
  data1: {
    width: props => props.data1percent * 3,
    backgroundColor: '#bdcebe',
    color: '#4f3222',
    height: '100%',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'end',
    '& span': {
      margin: '0 3px 3px 3px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    }
  },
  data2: {
    width: props => props.data2percent * 3,
    height: '100px',
    backgroundColor: '#feb236',
    color: '#454140',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
    '& span': {
      margin: '0 3px 3px 3px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    }
  }
}))

const Graph = ({ total, data1, data2, language }) => {

  const data1percent = data1.amount && total.amount ? (parseInt(data1.amount.replace(',','')) / parseInt(total.amount.replace(',',''))) * 100 : '';
  const data2percent = data2.amount && total.amount ? (parseInt(data2.amount.replace(',','')) / parseInt(total.amount.replace(',',''))) * 100 : '';
  const props = {data1percent, data2percent}
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.data1}>
        <span className={classes.name}>{data1.name}</span>
        <span></span>
      </div>
      <div className={classes.data2}>
        <span>{data2.name}</span>
      </div>
    </div>
  );
  
};

export default Graph;