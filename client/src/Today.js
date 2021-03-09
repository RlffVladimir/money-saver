import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        
    },
})

function Today ({totalMoney, objectiveInAMonth}) {
    const classes = useStyles();
    const month
    return (
        <div className={classes.root}>
            <h1>Today</h1>
            <p>Current month is: </p>
            <p>Your total money is {totalMoney}</p>
            <p>Your objective in a month is {objectiveInAMonth}</p>
        </div>
    );
};

export default Today;