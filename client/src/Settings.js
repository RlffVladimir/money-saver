import React, { useState, useEffect } from 'react';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

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

function Settings({ totalMoney, setTotalMoney, objectiveInAMonth, setObjectiveInAMonth }) {
    const classes = useStyles();
    const [currentTotalMoney, setCurrentTotalMoney] = useState('');
    const [currentObjectiveInAMonth, setCurrentObjectiveInAMonth] = useState('');
    const [openTotalMoneyDialog, setOpenTotalMoneyDialog] = useState(false);
    const [openObjectiveDialog, setOpenObjectiveDialog] = useState(false);

    const handleCurrentTotalMoneyChange = e => {
        setCurrentTotalMoney(e.target.value)
    }
    const handleTotalMoneyChange = () => {
        setTotalMoney(currentTotalMoney);
        setCurrentTotalMoney('');
        handleClose();
    }
    const handleCurrentObjectiveInAMonthChange = e => {
        setCurrentObjectiveInAMonth(e.target.value);
    }
    const handleObjectiveInAMonthChange = () => {
        setObjectiveInAMonth(currentObjectiveInAMonth);
        setCurrentObjectiveInAMonth('');
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

            <p>{`Your total money is ${totalMoney}.`}</p>
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

            <p>{`Your objective in a month is ${objectiveInAMonth}.`}</p>
            <Button onClick={handleOpenObjectiveDialog} variant='contained'>Change objective</Button>
            <Dialog open={openObjectiveDialog} onClose={handleClose} className={classes.dialog}>
            <ValidatorForm className={classes.form} onSubmit={handleObjectiveInAMonthChange} className={classes.dialogContent}>
                <DialogTitle>Change objective</DialogTitle>
                <TextValidator 
                  label='Objective in a Month' 
                  value={currentObjectiveInAMonth}
                  onChange={handleCurrentObjectiveInAMonthChange}
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