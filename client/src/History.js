import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const useStyles = makeStyles({
    root: {

    },
});

function History () {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>History</h1>
            <Calendar />
        </div>
    )
}

export default History;