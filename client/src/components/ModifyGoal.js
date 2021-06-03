import React from 'react';
import ModifyBalance from './ModifyBalance';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core';
import { DialogTitle, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1rem',
    },
    dialogContent: {
        margin: '30px 20px',
    },
    dialogButton: {
        margin: '20px 10px'
    }
}))

function ModifyGoal({ handleGoalChange, currentGoal, Settings, handleCurrentGoalChange, handleClose }) {
    const classes = useStyles();
    return (
        <ValidatorForm className={`${classes.form} ${classes.dialogContent}`} onSubmit={handleGoalChange}>
            <DialogTitle>{Settings.goal.dialog.title}</DialogTitle>
            <TextValidator
                label={Settings.goal.dialog.label}
                value={currentGoal}
                onChange={handleCurrentGoalChange}
                validators={['isANumber']}
                errorMessages={['Must be a number!']}
            />
            <Button variant='contained' color='primary' type='submit' className={classes.dialogButton}>{Settings.goal.dialog.submitButton}</Button>
            <Button onClick={handleClose} variant='contained' color='secondary' className={classes.dialogButton}>{Settings.goal.dialog.cancelButton}</Button>
        </ValidatorForm>
    )
}

export default ModifyGoal;