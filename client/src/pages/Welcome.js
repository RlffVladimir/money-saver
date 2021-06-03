import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../auth/Login';
import Signin from '../auth/Signin';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import makeStyles from './WelcomeStyles';
import withFetch from '../hoc/withFetch';
import { LanguageContext } from '../contexts/LanguageContext';
import translation from '../translation';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles;

function Welcome({ data, fetchData, setIsFetching }) {
    const [signinOpen, setSigninOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [signinSuccess, setSigninSuccess] = useState(false);
    const classes = useStyles();
    const { language } = useContext(LanguageContext);
    const history = useHistory();

    const { Welcome } = translation[language]

    useEffect(() => {
        fetchData();
        setIsFetching(false);
    }, [])

    const handleClose = () => {
        setSigninOpen(false);
        setLoginOpen(false);
    }

    const notLoggedIn = (
        <>
            <div className={classes.buttons}>
                <Button className={classes.button} color='primary' variant='contained' onClick={() => setSigninOpen(true)}>{Welcome.createAccountButton}</Button>
                <Button className={classes.button} color='primary' variant='contained' onClick={() => setLoginOpen(true)}>{Welcome.loginButton}</Button>
            </div>
            <div style={{marginTop: '2rem'}}>
                {Welcome.example.line1}<br/>
                <b>{Welcome.example.line2}</b>
            </div>
            <Dialog open={loginOpen} onClose={handleClose}>
                <Login />
            </Dialog>
            <Dialog open={signinOpen} onClose={handleClose}>
                <Signin setSigninSuccess={setSigninSuccess} setSigninOpen={setSigninOpen} />
            </Dialog>
        </>
    );

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant='h3' color='secondary'><b>money</b>saver</Typography>
            <Typography className={classes.subtitle} variant='h5' color='secondary'>{Welcome.subtitle}</Typography>
            {signinSuccess ? <Typography className={classes.signinSuccess} variant='h4'>{Welcome.signinSuccessMessage}</Typography> : ''}
            {!data && notLoggedIn}
            {data
                &&  <>
                        <div className={classes.body}>
                            <Typography
                                className={classes.subtitle}
                                variant='h5'
                                color='secondary'>
                                {`${Welcome.welcomeMessage.part1}${data.names[0].name}${Welcome.welcomeMessage.part2}${data.names[1].name}${Welcome.welcomeMessage.part3}`}
                            </Typography>
                            <div className={classes.tiles}>
                                <div onClick={() => history.push('/today')} className={`${classes.tile} ${classes.today}`}>
                                    <AccessTimeIcon className={classes.icon} />
                                    <span>{Welcome.todayTile}</span>
                                            </div>
                                <div onClick={() => history.push('/expenses')} className={`${classes.tile} ${classes.expenses}`}>
                                    <ShoppingBasketIcon className={classes.icon} />
                                    <span>{Welcome.expensesTile}</span>
                                </div>
                            </div>

                        </div>
                        <div className={classes.addExpenseLabel}>
                            {Welcome.addExpenseLabel}
                        </div>
                    </>
            }
        </div>
    )
}

export default withFetch(Welcome);