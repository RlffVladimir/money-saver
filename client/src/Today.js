import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        
    },
})

function Today ({totalMoney, monthGoal, currentDate}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Today is {currentDate.year}/{currentDate.month}/{currentDate.day}</h1>
            <p>Total money is {totalMoney.amount}</p>
            <p>Current goal is {monthGoal.goal}</p>
        </div>
    );
};

export default Today;