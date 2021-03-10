import React, { useState, useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const useStyles = makeStyles({
    root: {

    },
    dialog: {
        
    },
    dialogContent: {
        margin: '30px 20px',
    },
    dialogButton: {
        margin: '20px 10px'
    }
})

function Settings({ totalMoney, currentDate }) {
    const classes = useStyles();
    const [currentTotalMoney, setCurrentTotalMoney] = useState('');
    const [currentGoal, setCurrentGoal] = useState('');
    const [openTotalMoneyDialog, setOpenTotalMoneyDialog] = useState(false);
    const [openObjectiveDialog, setOpenObjectiveDialog] = useState(false);

    const handleCurrentTotalMoneyChange = e => {
        setCurrentTotalMoney(e.target.value)
    }
    const handleTotalMoneyChange = async () => {
        await axios.post('http://localhost:5000/api/totalMoney', {amount: currentTotalMoney});
        setCurrentTotalMoney('');
        handleClose();
    }
    const handleCurrentGoalChange = e => {
        setCurrentGoal(e.target.value);
    }
    const handleGoalChange = async () => {
        await axios.post('http://localhost:5000/api/goal', {
            goal: currentGoal,
            date: {
                year: currentDate.year,
                month: currentDate.month
            }
        })
        setCurrentGoal('');
        handleClose();
    }
    const handleOpenTotalMoneyDialog = () => {
        setOpenTotalMoneyDialog(true)
    }
    const handleOpenObjectiveDialog = () => {
        setOpenObjectiveDialog(true)
    }
    const handleClose = () => {
        setOpenTotalMoneyDialog(false);
        setOpenObjectiveDialog(false);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isANumber', value => {
            return !isNaN(value)
        })
    })


    return (
        <div className={classes.root}>
            <h1>Settings</h1>

            <p>{`Your total money is ${totalMoney.amount}.`}</p>
            <Button onClick={handleOpenTotalMoneyDialog} variant='contained'>Change total money</Button>
            <Dialog open={openTotalMoneyDialog} onClose={handleClose} className={classes.dialog}>
            <ValidatorForm className={classes.form} onSubmit={handleTotalMoneyChange} className={classes.dialogContent}>
                <DialogTitle>Change total money</DialogTitle>
                <TextValidator 
                  label='Total Money' 
                  value={currentTotalMoney}
                  onChange={handleCurrentTotalMoneyChange}
                  validators={['isANumber']}
                  errorMessages={['Must be a number!']}
                />
                <Button variant='contained' type='submit' color='primary' className={classes.dialogButton}>Submit</Button>
                <Button onClick={handleClose} variant='contained' color='secondary' className={classes.dialogButton}>Cancel</Button>
            </ValidatorForm>
            </Dialog>

            <p>{`Your objective in a month is ${currentGoal}.`}</p>
            <Button onClick={handleOpenObjectiveDialog} variant='contained'>Change objective</Button>
            <Dialog open={openObjectiveDialog} onClose={handleClose} className={classes.dialog}>
            <ValidatorForm className={classes.form} onSubmit={handleGoalChange} className={classes.dialogContent}>
                <DialogTitle>Change objective</DialogTitle>
                <TextValidator 
                  label='Objective in a Month' 
                  value={currentGoal}
                  onChange={handleCurrentGoalChange}
                  validators={['isANumber']}
                  errorMessages={['Must be a number!']}
                />
                <Button variant='contained' color='primary' type='submit' className={classes.dialogButton}>Submit</Button>
                <Button onClick={handleClose} variant='contained' color='secondary' className={classes.dialogButton}>Cancel</Button>
            </ValidatorForm>
            </Dialog>
            
        </div>
    );
};

export default Settings;