import React, { useState, useEffect, useContext } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {Button, Dialog, DialogTitle, Typography, Divider} from '@material-ui/core';
import axios from 'axios';
import makeStyles from './SettingsStyles';
import withStats from '../hoc/withStats';
import withFetch from '../hoc/withFetch';
import withAuth from '../hoc/withAuth';
import {API_URL} from '../constants';
import {months} from '../utils/formatDate';
import translation from '../translation';
import {LanguageContext} from '../contexts/LanguageContext';
import ModifyGoal from '../components/ModifyGoal';

const useStyles = makeStyles;

function Settings({stats, data, setData}) {
    const classes = useStyles();
    const {language} = useContext(LanguageContext);
    const [currentTotalMoney, setCurrentTotalMoney] = useState('');
    const [currentGoal, setCurrentGoal] = useState('');
    const [currentName1, setCurrentName1] = useState(data.names ? data.names[0].name : '');
    const [currentName2, setCurrentName2] = useState(data.names ? data.names[1].name : '');

    const [openTotalMoneyDialog, setOpenTotalMoneyDialog] = useState(false);
    const [openNamesDialog, setOpenNamesDialog] = useState(false);
    const [openObjectiveDialog, setOpenObjectiveDialog] = useState(false);

    const {Settings} = translation[language];

    const {
        thisUserTotalMoney,
        thisUserMonthGoal
    } = stats;
    
    const handleCurrentTotalMoneyChange = e => {
        setCurrentTotalMoney(e.target.value)
    }
    const handleCurrentGoalChange = e => {
        setCurrentGoal(e.target.value);
    }
    const handleCurrentName1Change = e => {
        setCurrentName1(e.target.value);
    }
    const handleCurrentName2Change = e => {
        setCurrentName2(e.target.value)
    }

    const handleOpenTotalMoneyDialog = () => {
        setOpenTotalMoneyDialog(true);
    }
    const handleOpenObjectiveDialog = () => {
        setOpenObjectiveDialog(true);
    }
    const handleOpenNamesDialog = () => {
        setOpenNamesDialog(true);
    }

    const handleClose = () => {
        setOpenTotalMoneyDialog(false);
        setOpenObjectiveDialog(false);
        setOpenNamesDialog(false);
        setCurrentTotalMoney('');
        setCurrentGoal('');
        setCurrentName1(data.names[0].name);
        setCurrentName2(data.names[1].name);
    }

    const handleTotalMoneyChange = async () => {
        await axios.post(API_URL + 'totalMoney', {
            shared: {
                isShared: false,
                users: []
            },
            amount: currentTotalMoney, 
            user: data.user
        });
        setData({
            totalMoney: {
                shared: {
                    isShared: false,
                    users: []
                },
                amount: currentTotalMoney,
                user: data.user
            },
            monthGoal: data.monthGoal,
            expenses: data.expenses,
            user: data.user,
            names: data.names,
            token: data.token,
            currentDate: data.currentDate
        })
        window.location.reload(true);
    }

    

    const handleGoalChange = async () => {
        await axios.post(API_URL + 'goal', {
            goal: currentGoal,
            date: {
                year: data.currentDate.year,
                month: data.currentDate.month
            },
            user: data.user
        })
        setData({
            totalMoney: data.totalMoney,
            monthGoal: {
                goal: currentGoal,
                date: {
                    year: data.currentDate.year,
                    month: data.currentDate.month
                },
                user: data.user
            },
            expenses: data.expenses,
            user: data.user,
            names: data.names,
            token: data.token,
            currentDate: data.currentDate
        });
        window.location.reload(true);
    }

    const handleNamesChange = async () => {
        const res = await axios.put(API_URL + 'user', {
                username: data.user,
                oldname1: data.names[0].name,
                oldname2: data.names[1].name,
                name1: currentName1,
                name2: currentName2
        })
        console.log(res.data);
        setData({
            totalMoney: data.totalMoney,
            monthGoal: data.monthGoal,
            expenses: data.expenses,
            user: data.user,
            names: [
                {name1: currentName1, balance: data.names[0].balance},
                {name2: currentName2, balance: data.names[1].balance}
            ],
            token: data.token,
            currentDate: data.currentDate
        })
        window.location.reload(true);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isANumber', value => {
            return !isNaN(value)
        })
    })


    return (
        <div className={classes.settings}>
            <Typography variant='h4' className={classes.title}>{Settings.title}</Typography>
            <Divider />
            <div className={classes.forms}>
                <div className={classes.form}>
                            <Typography className={classes.formTitle} variant='h5'>{`${Settings.totalMoney.text}${thisUserTotalMoney}`}</Typography>
                            <Button className={classes.modifyButton} onClick={handleOpenTotalMoneyDialog} variant='contained' color='secondary'>{Settings.totalMoney.button}</Button>
                    <Dialog open={openTotalMoneyDialog} onClose={handleClose} className={classes.dialog}>
                    <ValidatorForm className={`${classes.form} ${classes.dialogContent}`} onSubmit={handleTotalMoneyChange}>
                        <DialogTitle>{Settings.totalMoney.dialog.title}</DialogTitle>
                        <TextValidator 
                        label={Settings.totalMoney.dialog.label} 
                        value={currentTotalMoney}
                        onChange={handleCurrentTotalMoneyChange}
                        validators={['isANumber']}
                        errorMessages={['Must be a number!']}
                        />
                        <Button variant='contained' type='submit' color='primary' className={classes.dialogButton}>{Settings.totalMoney.dialog.submitButton}</Button>
                        <Button onClick={handleClose} variant='contained' color='secondary' className={classes.dialogButton}>{Settings.totalMoney.dialog.cancelButton}</Button>
                    </ValidatorForm>
                    </Dialog>
                </div>
                
                <Divider />
                <div className={classes.form}>
                            {thisUserMonthGoal
                            ? <>
                                <Typography className={classes.formTitle} variant='h5'>{`${language === 'english' ? months[data.currentDate.month - 1] : data.currentDate.month}${Settings.goal.text.defined}${thisUserMonthGoal}`}</Typography>
                                <Button className={classes.modifyButton} onClick={handleOpenObjectiveDialog} variant='contained' color='secondary'>{Settings.goal.button}</Button>
                              </>
                            : <>
                                <Typography className={classes.formTitle} variant='h5'>{`${language === 'english' ? months[data.currentDate.month - 1] : data.currentDate.month}${Settings.goal.text.notDefined}`}</Typography>
                                <Button className={classes.modifyButton} onClick={handleOpenObjectiveDialog} variant='contained' color='secondary'>{Settings.goal.dialog.title}</Button>
                              </>
                            }
                            
                    <Dialog open={openObjectiveDialog} onClose={handleClose} className={classes.dialog}>
                        <ModifyGoal handleGoalChange={handleGoalChange} currentGoal={currentGoal} Settings={Settings} handleCurrentGoalChange={handleCurrentGoalChange} handleClose={handleClose}/>
                    </Dialog>
                </div>

                <Divider />

                <div className={classes.form}>
                            <Typography className={classes.formTitle} variant='h5'>{`${Settings.names.text.part1}`}</Typography>
                            <Typography className={classes.formTitle} variant='h5'>{`${data.names ? data.names[0].name : ''}${Settings.names.text.part2}${data.names ? data.names[1].name : ''}`}</Typography>
                            <Button className={classes.modifyButton} onClick={handleOpenNamesDialog} variant='contained' color='secondary'>{Settings.names.button}</Button>
                    <Dialog open={openNamesDialog} onClose={handleClose} className={classes.dialog}>
                    <ValidatorForm className={`${classes.form} ${classes.dialogContent}`} onSubmit={handleNamesChange}>
                        <DialogTitle>{Settings.names.dialog.title}</DialogTitle>
                        <TextValidator 
                        label={Settings.names.dialog.label1}
                        value={currentName1}
                        onChange={handleCurrentName1Change}
                        />
                        <TextValidator 
                        label={Settings.names.dialog.label2}
                        value={currentName2}
                        onChange={handleCurrentName2Change}
                        />
                        <Button variant='contained' color='primary' type='submit' className={classes.dialogButton}>{Settings.names.dialog.submitButton}</Button>
                        <Button onClick={handleClose} variant='contained' color='secondary' className={classes.dialogButton}>{Settings.names.dialog.cancelButton}</Button>
                    </ValidatorForm>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default withAuth(withFetch(withStats(Settings)));