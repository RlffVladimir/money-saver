import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from './LoginStyles';
import axios from 'axios';
import { API_URL } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';
import translation from '../translation';

const useStyles = makeStyles;

function Login({ setLoginOpen }) {
    const classes = useStyles();
    const { language } = useContext(LanguageContext);
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState(false);

    const {Login} = translation[language]

    const handleUsernameChange = e => {
        setUsernameValue(e.target.value);
    }
    const handlePasswordChange = e => {
        setPasswordValue(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(API_URL + 'user/login', { username: usernameValue, password: passwordValue });
            if (res.status === 200) {
                if (setLoginOpen !== undefined) setLoginOpen(false);
                localStorage.setItem('token', res.data.token);
                window.location.reload(false);
            } else {
                setLoginErrorMessage(true);
            }
        } catch {
            setLoginErrorMessage(true);
        }


    }

    const errorMessage = <p style={{ color: 'red' }}>Incorrect username or password</p>

    return (
        <div className={classes.login}>
            <Typography className={classes.title} variant='h3'>{Login.title}</Typography>
            {loginErrorMessage && errorMessage}
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField className={classes.field} required value={usernameValue} name='username' label={Login.username} color='secondary' onChange={handleUsernameChange} />
                <TextField className={classes.field} required value={passwordValue} name='password' label={Login.password} color='secondary' type='password' onChange={handlePasswordChange} />
                <Button className={classes.button} variant='contained' color='primary' type='submit'>{Login.submitButton}</Button>
            </form>
        </div>
    )
};

export default Login;