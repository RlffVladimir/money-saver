import React, { useContext, useState } from 'react';
import { API_URL } from '../constants';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import AddIcon from '@material-ui/icons/Add';
import withFetch from '../hoc/withFetch';
import withAuth from '../hoc/withAuth';
import translation from '../translation';
import { LanguageContext } from '../contexts/LanguageContext';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Fab,
    Select,
    InputLabel,
    MenuItem,
    FormControl
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '30px'
    },
    newExpenseForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5rem 0'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        margin: '2rem',
    }
}))


function NewExpense({ buttonOnly, data, setData, fetchData, setIsFetching, setTodayReload }) {
    const classes = useStyles();
    const { language } = useContext(LanguageContext);
    const [currentProductName, setCurrentProductName] = useState('');
    const [currentAmount, setCurrentAmount] = useState('');
    const [currentPurchaser, setCurrentPurchaser] = useState('');
    const [addExpenseOpen, setAddExpenseOpen] = useState(false);

    const { NewExpense } = translation[language];

    const handleChangeProductName = e => {
        setCurrentProductName(e.target.value);
    }
    const handleChangeAmount = e => {
        setCurrentAmount(e.target.value);
    }
    const handleChangePurchaser = e => {
        setCurrentPurchaser(e.target.value)
    }

    const handleClose = () => {
        setCurrentProductName('');
        setCurrentAmount('');
        setCurrentPurchaser('');
        setAddExpenseOpen(false);
    }

    const handleNewExpense = async e => {
        setCurrentProductName('');
        setCurrentAmount('');
        setCurrentPurchaser('');
        setAddExpenseOpen(false);
        const newExpense = {
            date: {
                year: data.currentDate.year,
                month: data.currentDate.month,
                day: data.currentDate.day
            },
            productName: currentProductName,
            amount: parseInt(currentAmount),
            user: data.user,
            purchaser: currentPurchaser
        }
        axios.post(API_URL + 'expenses', newExpense).then(() => window.location.reload(true));
        // setData({
        //     totalMoney: data.totalMoney,
        //     monthGoal: data.monthGoal,
        //     expenses: [...data.expenses, newExpense],
        //     user: data.user,
        //     currentDate: data.currentDate,
        //     names: data.names,
        //     token: data.token
        // });
    }

    return (
        <div className={classes.root}>
            {buttonOnly === true
                ? <Button variant='contained' color='primary' onClick={() => setAddExpenseOpen(true)}>{NewExpense.title}</Button>
                : <Fab className={classes.fab} onClick={() => setAddExpenseOpen(true)} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            }

            <Dialog open={addExpenseOpen} onClose={handleClose} fullWidth={true}>
                <DialogContent className={classes.newExpenseForm}>
                    <DialogTitle variant='h5'>{NewExpense.title}</DialogTitle>
                    <ValidatorForm className={classes.form} onSubmit={handleNewExpense}>
                        <TextValidator
                            label={NewExpense.name}
                            value={currentProductName}
                            onChange={handleChangeProductName}
                            validators={['required']}
                            errorMessages={['Required!']}
                        />
                        <FormControl>
                            <InputLabel id='purchaser'>{NewExpense.whoPurchasedIt}</InputLabel>
                            <Select
                                labelId='purchaser'
                                id='purchaser'
                                value={currentPurchaser}
                                onChange={handleChangePurchaser}
                            >
                                <MenuItem value={data.names ? data.names[0].name : ''}>{data.names ? data.names[0].name : ''}</MenuItem>
                                <MenuItem value={data.names ? data.names[1].name : ''}>{data.names ? data.names[1].name : ''}</MenuItem>
                            </Select>
                        </FormControl>

                        <TextValidator
                            label={NewExpense.amount}
                            value={currentAmount}
                            onChange={handleChangeAmount}
                            validators={['required']}
                            errorMessages={['Required!']}
                        />
                        <Button className={classes.button} variant='contained' type='submit' color='primary'>{NewExpense.button}</Button>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default withAuth(withFetch(NewExpense));