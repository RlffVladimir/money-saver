import React from 'react';
import Badge from './Badge';
import { formatDate } from '../utils/formatDate';
import { Typography } from '@material-ui/core'
import translation from '../translation';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    title: {

    },
    expenses: {
        width: '100%',
    }
}))

function LastExpenses({ data, language }) {

    const { LastExpenses } = translation[language]
    const classes = useStyles();

    const sortedExpenses = data.expenses.sort((year1, year2) => {
        return year1.date.year - year2.date.year;
    }).sort((month1, month2) => {
        return month1.date.month - month2.date.month
    }).sort((date1, date2) => {
        return date1.date.day - date2.date.day
    })

    const displayExpenses = sortedExpenses.map(e => {
        return <Badge key={e._id} text={e.productName} data={e.amount} purchaser={e.purchaser.name} date={formatDate(e.date.day, e.date.month, e.date.year, language)} />
    }).slice(0, 8);

    return (
        <div className={classes.root}>
            <Typography variant='h4' className={classes.title}>{LastExpenses.title}</Typography>
            <div className={classes.expenses}>{displayExpenses}</div>
        </div>
    )
}

export default LastExpenses;