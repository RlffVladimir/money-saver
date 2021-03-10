import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {

    },
    form: {

    },
    expense: {
        backgroundColor: 'white',
        borderRadius: '5px',
        margin: '10px 0',
        padding: '10px 10px'
    },
    expenseAmount: {
        padding: '0px',
        margin: '0'
    },
    expenseCategory: {
        margin: '0',
        padding: '0'
    }
})



function NewExpense({expenses, currentDate}) {
    const classes = useStyles();
    const [currentCategory, setCurrentCategory] = useState('');
    const [currentAmount, setCurrentAmount] = useState('');

    const displayExpenses = expenses.map(expense => {
        return (
            <div className={classes.expense}>
                <h3 className={classes.expenseAmount}>{expense.amount}</h3>
                <p className={classes.expenseCategory}>{`${expense.category}`}</p>
                <p className={classes.expenseDate}>{`${expense.date.year}/${expense.date.month}/${expense.date.day}`}</p>
            </div>
        );
    })

    const handleNewExpense = async e => {
        const newExpense = {
            date: {
                year: currentDate.year,
                month: currentDate.month,
                day: currentDate.day 
            },
            category: currentCategory,
            amount: currentAmount
        }
        const res = await axios.post('http://localhost:5000/api/expenses', newExpense);
        console.log(res.data)
        setCurrentCategory('');
        setCurrentAmount('');
    }

    const handleChangeCategory = e => {
        setCurrentCategory(e.target.value);
    }
    const handleChangeAmount = e => {
        setCurrentAmount(e.target.value);
    }

    return (
        <div className={classes.root}>
            <h1>New Expense</h1>
            <ValidatorForm className={classes.form} onSubmit={handleNewExpense}>
                <TextValidator
                    label='Category'
                    value={currentCategory}
                    onChange={handleChangeCategory}
                    validators={['required']}
                    errorMessages={['Required!']}
                />
                <TextValidator
                    label='Amount'
                    value={currentAmount}
                    onChange={handleChangeAmount}
                    validators={['required']}
                    errorMessages={['Required!']}
                />
                <Button variant='contained' type='submit'>Submit</Button>
            </ValidatorForm>
            {displayExpenses}
        </div>
    );
};

export default NewExpense;