import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Calendar from '../components/Calendar';
import 'react-calendar/dist/Calendar.css';
import Badge from '../components/Badge';
import makeStyles from './ExpensesStyles';
import withFetch from '../hoc/withFetch';
import withAuth from '../hoc/withAuth';
import { API_URL } from '../constants';
import { formatDate } from '../utils/formatDate';
import {
    Typography,
} from '@material-ui/core';
import translation from '../translation';
import { LanguageContext } from '../contexts/LanguageContext';

const useStyles = makeStyles;

function Expenses({ data }) {
    const { language } = useContext(LanguageContext);
    const classes = useStyles();
    const history = useHistory();
    const { Expenses } = translation[language]
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [displayedExpenses, setDisplayedExpenses] = useState(
        data.expenses.filter(expense => {
            return expense.date.day === selectedDate.getDate()
                && expense.date.month === selectedDate.getMonth() + 1
                && expense.date.year === selectedDate.getFullYear();
        }));

    useEffect(() => {
        setDisplayedExpenses(data.expenses.filter(expense => {
            return expense.date.day === selectedDate.getDate()
                && expense.date.month === selectedDate.getMonth() + 1
                && expense.date.year === selectedDate.getFullYear();
        }))
    }, [selectedDate])

    useEffect(() => {
        if (data.token === null) {
            history.push('/');
        }
    })

    const deleteExpense = async id => {
        const res = await axios.delete(API_URL + 'expenses', { data: { id } })
        console.log(res);
        setDisplayedExpenses(displayedExpenses.filter(e => e._id !== id));
    }




    return (
        <div className={classes.expensePage}>
            <Typography className={classes.title} variant='h3'>{Expenses.title}</Typography>
            <div className={classes.calendarAndExpenses}>
                <div className={classes.calendar}>
                    <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} data={data} />
                </div>

                <div className={classes.expenses}>
                    {displayedExpenses.length > 0
                        ? displayedExpenses.map(e => <Badge 
                                                        key={e._id} 
                                                        id={e._id} 
                                                        text={e.productName} 
                                                        data={e.amount} 
                                                        purchaser={e.purchaser.name} 
                                                        date={formatDate(e.date.day, e.date.month, e.date.year, language)} 
                                                        deleteExpense={deleteExpense} 
                                                     />)
                        : <Badge text={Expenses.noExpense} />
                    }
                </div>
            </div>
        </div>
    );
};

export default withAuth(withFetch(Expenses));