import React, { useState, useContext } from 'react';
import {Typography, Button, TextField, Divider } from '@material-ui/core/';
import axios from 'axios';
import makeStyles from './SigninStyles';
import {API_URL} from '../constants';
import {LanguageContext} from '../contexts/LanguageContext';
import translation from '../translation';

const useStyles = makeStyles;

function Signin({setSigninSuccess, setSigninOpen}) {
    const classes = useStyles();
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [totalMoneyValue, setTotalMoneyValue] = useState('');
    const [name1Value, setName1Value] = useState('');
    const [name2Value, setName2Value] = useState('');

    const {language} = useContext(LanguageContext);
    const {Signup} = translation[language];

    const handleUsernameChange = e => {
        setUsernameValue(e.target.value);
    }

    const handlePasswordChange = e => {
        setPasswordValue(e.target.value);
    }

    const handleTotalMoneyChange = e => {
        setTotalMoneyValue(e.target.value);
    }

    const handleName1Change = e => {
        setName1Value(e.target.value);
    }
    const handleName2Change = e => {
        setName2Value(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post(API_URL + 'user/register', {
            username: usernameValue,
            password: passwordValue,
            names: [
                {name: name1Value},
                {name: name2Value}
            ]
        })
        await axios.post(API_URL + 'totalMoney', {
            amount: totalMoneyValue,
            user: usernameValue
        })
        setUsernameValue('');
        setPasswordValue('')
        setTotalMoneyValue('');
        setName1Value('');
        setName2Value('');
        setSigninOpen(false);
        setSigninSuccess(true)
    }

    return (
        <div className={classes.signin}>
            <Typography className={classes.title} variant='h3'>{Signup.title}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField className={classes.field} required value={usernameValue} name='username' label={Signup.username} color='secondary' onChange={handleUsernameChange} />
                <TextField className={classes.field} required value={passwordValue} name='password' label={Signup.password} color='secondary' type='password' onChange={handlePasswordChange} />
                <Divider style={{marginTop: '2rem'}}/>
                <Divider /><Divider /><Divider /><Divider />
                <Typography>{Signup.oneAccountForTwoPersons}</Typography>
                <TextField className={classes.field} value={name1Value} name='name1' label={Signup.nameLabel1} color='secondary' onChange={handleName1Change} />
                <TextField className={classes.field} value={name2Value} name='name2' label={Signup.nameLabel2} color='secondary' onChange={handleName2Change} />
                <TextField className={classes.field} required value={totalMoneyValue} name='totalMoney' label={Signup.totalMoney} color='secondary' onChange={handleTotalMoneyChange} />
                <Button className={classes.button} variant='contained' color='primary' type='submit'>{Signup.submitButton}</Button>
            </form>
        </div>
    )
};

export default Signin;