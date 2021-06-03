import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Typography, Divider, Card, Dialog, CardContent, Button } from '@material-ui/core/';
import withFetch from '../hoc/withFetch';
import MoneyIcon from '@material-ui/icons/Money';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import makeStyles from './TodayStyles';
import withStats from '../hoc/withStats'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LastExpenses from '../components/LastExpenses';
import { formatDate, months } from '../utils/formatDate';
import Graph from '../charts/Graph';
import NewExpense from '../components/NewExpense';
import ModifyBalance from '../components/ModifyBalance';
import translation from '../translation';
import { LanguageContext } from '../contexts/LanguageContext';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ModifyGoal from '../components/ModifyGoal';
import axios from 'axios';
import {API_URL} from '../constants';

const useStyles = makeStyles;

function Today({ stats, fetchData, data, setData }) {
    const { language } = useContext(LanguageContext);
    const classes = useStyles();
    const history = useHistory();
    const [modifyBalanceDialog, setModifyBalanceDialog] = useState(false);
    const [todayReload, setTodayReload] = useState(false);
    const [currentGoal, setCurrentGoal] = useState('');
    const [openGoalDialog, setOpenGoalDialog] = useState(false);

    const { Today, Settings } = translation[language]
    const { totalMoney, expenses, balance, goal } = Today;

    const {
        thisUserTotalMoney,
        endOfMonth,
        thisUserMonthGoal,
        limit,
        totalExpensesAmount,
        expensesFromName1,
        expensesFromName2
    } = stats

    useEffect(() => {
        if (data.token === null) {
            history.push('/');
        }
    })

    const handleCurrentGoalChange = e => {
        setCurrentGoal(e.target.value);
    }

    const handleClose = () => {
        setModifyBalanceDialog(false);
        setOpenGoalDialog(false);
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

    return (
        <div className={classes.root}>
            <div className={classes.today}>
                <Typography variant='h3' className={classes.title}>
                    {Today.title}
                </Typography>
                <Card className={classes.card}>
                    <CardContent className={classes.datas}>

                        {/* ******** */}
                        {/* DATE */}
                        {/* ******** */}
                        <Typography variant='h5' className={classes.date}>
                            {formatDate(data.currentDate.day, data.currentDate.month, data.currentDate.year, language)}
                        </Typography>
                        <Divider />

                        {/* ******** */}
                        {/* TOTAL MONEY */}
                        {/* ******** */}
                        <Typography className={classes.dataTitle} variant='h5' ><MoneyIcon /> {totalMoney.title}</Typography>
                        <div className={classes.data}>
                            <div className={classes.dataText}>
                                <Typography>
                                    {totalMoney.text.part1}<span className={classes.dataNumber}>¥{thisUserTotalMoney}</span>{totalMoney.text.part2}
                                </Typography>

                            </div>

                        </div>
                        <Divider />

                        {/* ******** */}
                        {/* EXPENSES */}
                        {/* ******** */}
                        <Typography className={classes.dataTitle} variant='h5' ><ShoppingCartIcon /> {expenses.title}</Typography>
                        <div className={classes.data}>
                            {data.expenses[0]
                                ? <>
                                    <div className={classes.dataText}>
                                        <Typography>
                                            {expensesFromName1 !== null
                                                ? <>{data.names[0].name}{expenses.text.line1_2.part1}<span className={classes.dataNumber}>¥{expensesFromName1}</span>{expenses.text.line1_2.part2}<br /></>
                                                : <>{data.names[0].name}{expenses.text.line1_2.part3}<br /></>
                                            }
                                            {expensesFromName2 !== null
                                                ? <>{data.names[1].name}{expenses.text.line1_2.part1}<span className={classes.dataNumber}>¥{expensesFromName2}</span>{expenses.text.line1_2.part2}<br /></>
                                                : <>{data.names[1].name}{expenses.text.line1_2.part3}<br /></>
                                            }
                                            {expenses.text.line3.part1}<span className={classes.dataNumber}>¥{totalExpensesAmount}</span>
                                        </Typography>
                                    </div>
                                    <div className={classes.dataRight}>
                                        {expensesFromName1 && expensesFromName2 
                                        ? <Graph
                                            total={{ name: 'Expenses', amount: totalExpensesAmount }}
                                            data1={{ name: data.names[0].name, amount: expensesFromName1 }}
                                            data2={{ name: data.names[1].name, amount: expensesFromName2 }}
                                            language={language}
                                        />
                                        : ''}
                                    </div>
                                </>
                                :
                                <>
                                    <div className={classes.dataText}>
                                        <Typography>{expenses.text.noExpense}</Typography>
                                    </div>
                                    <div className={classes.dataRight}>
                                        <NewExpense buttonOnly={true} setTodayReload={setTodayReload} todayReload={todayReload} />
                                    </div>
                                </>
                            }

                        </div>


                        {data.expenses[0]
                            ? <>
                                <Divider />

                                {/* ******** */}
                                {/* BALANCE */}
                                {/* ******** */}
                                <Typography className={classes.dataTitle} variant='h5' ><SyncAltIcon /> {balance.title}</Typography>
                                <div className={classes.data}>
                                    {data.expenses[0]
                                        ? <>
                                            <div className={classes.dataText}>
                                                <Typography>
                                                    {data.names[0].name} : {data.names[0].balance}<br />
                                                    {data.names[1].name} : {data.names[1].balance}
                                                </Typography>
                                            </div>
                                            <div className={classes.dataRight}>
                                                <Button variant='contained' color='primary' style={{ width: '200px' }} onClick={() => setModifyBalanceDialog(true)}>{balance.modifyBalanceButton}</Button>
                                                <Dialog open={modifyBalanceDialog} onClose={handleClose} fullScreen={window.innerWidth < 400 && true}>
                                                    <ModifyBalance data={data} />
                                                    <Button onClick={handleClose} >{balance.closeButton}</Button>
                                                </Dialog>
                                            </div>
                                        </>
                                        : 
                                        <NewExpense buttonOnly={true} setTodayReload={setTodayReload} todayReload={todayReload} />
                                    }
                                </div>
                            </>
                            : ''
                        }
                        <Divider />

                        {/* ******** */}
                        {/* MONTH GOAL */}
                        {/* ******** */}
                        <Typography className={classes.dataTitle} variant='h5' ><TrendingUpIcon /> {goal.title}</Typography>
                        <div className={classes.data}>

                            <div className={classes.dataText}>
                                {thisUserMonthGoal
                                    ? <Typography>
                                        {`${language === 'english' ? months[data.currentDate.month - 1] : data.currentDate.month}${goal.text.line1.part1}`}<span className={classes.dataNumber}>¥{thisUserMonthGoal}</span>{goal.text.line1.part2}<br />
                                        {goal.text.line2.part1}<span className={classes.dataNumber} style={{ color: endOfMonth > 0 ? 'green' : 'red' }}>¥{limit}</span>{goal.text.line2.part2}
                                    </Typography>
                                    : <Typography>{`${language === 'english' ? months[data.currentDate.month - 1] : data.currentDate.month}${goal.text.line1.part3}`}</Typography>
                                }
                            </div>
                            {thisUserMonthGoal
                                ? ''
                                : <div className={classes.dataRight}>
                                    <Button variant='contained' color='primary' onClick={() => setOpenGoalDialog(true)}>{goal.defineGoalButton}</Button>
                                    <Dialog open={openGoalDialog} onClose={handleClose}>
                                        <ModifyGoal handleGoalChange={handleGoalChange} currentGoal={currentGoal} Settings={Settings} handleCurrentGoalChange={handleCurrentGoalChange} handleClose={handleClose} />
                                    </Dialog>
                                </div>
                            }

                        </div>

                    </CardContent>
                </Card>
            </div>
            {data.expenses[0]
                ? <div className={classes.lastExpenses}>
                    <LastExpenses data={data} language={language} />
                </div>
                : ''
            }

        </div>

    );
};

export default withFetch(withStats(Today));