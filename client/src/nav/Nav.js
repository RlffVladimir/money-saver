import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import theme from '../theme';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Login from '../auth/Login';
import Signin from '../auth/Signin';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Settings from '../pages/Settings';
import SettingsIcon from '@material-ui/icons/Settings';
import makeStyles from './NavStyles';
import {LanguageContext} from '../contexts/LanguageContext';
import withFetch from '../hoc/withFetch';
import translation from '../translation';

const useStyles = makeStyles;

function Nav({data, setData}) {
    const {language, setLanguage} = useContext(LanguageContext);
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [loginOpen, setLoginOpen] = useState(false);
    const [signinOpen, setSigninOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const {Navbar} = translation[language]

    const handleNavigation = e => {
        const target = e.target.id;
        const currentTarget = e.currentTarget.name;
        if (target === 'logout') {
            setAccountMenuOpen(false);
            localStorage.removeItem('token');
            localStorage.removeItem('data');
            setData({
                token: null,
                user: null,
                currentData: null,
                totalMoney: [],
                monthGoal: [],
                expenses: [],
            });
            history.push('/');
            window.location.reload(true)
        } else if (target === 'welcome') {
            setAccountMenuOpen(false);
            history.push('/')
        } else if (currentTarget) {
            history.push(`/${currentTarget}`)
        } else {
            setAccountMenuOpen(false);
            history.push(target)
        }
    }

    const handleAccountMenuOpen = e => {
        setAccountMenuOpen(e.currentTarget);
    };
    const handleSettingsOpen = e => {
        setAccountMenuOpen(false);
        setSettingsOpen(e.currentTarget);
    };

    const handleClose = () => {
        setLoginOpen(false);
        setSigninOpen(false);
        setAccountMenuOpen(false);
        setSettingsOpen(false);
    }

    return (
        <div className={classes.navbar}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" color="secondary">
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.toolbarLeft}>
                            <Typography className={classes.title} variant='h6' onClick={() => history.push('/')}>{Navbar.title}</Typography>
                            <Button onClick={handleAccountMenuOpen} color='primary' variant='outlined'><MenuIcon />{data ? window.innerWidth < 460 ? 'Menu' : data.user : 'Guest'}</Button>
                            <Menu open={Boolean(accountMenuOpen)} anchorEl={accountMenuOpen} onClose={handleClose}>
                                {!data && <MenuItem onClick={() => setLoginOpen(true)}><PersonOutlineOutlinedIcon />{Navbar.loginButton}</MenuItem>}
                                {!data && <MenuItem onClick={() => setSigninOpen(true)}><PersonAddOutlinedIcon />{Navbar.signinButton}</MenuItem>}
                                {data && <MenuItem onClick={handleNavigation} name='logout' value='logout' id='logout'>{window.innerWidth < 460 ? '' : <DirectionsRunIcon />}{Navbar.logoutButton}</MenuItem>}
                                {window.innerWidth < 460 && data ? 
                                <>
                                <MenuItem
                                    name="welcome"
                                    onClick={handleNavigation}
                                    id='welcome'>
                                        {Navbar.welcomeButton}
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    name="today"
                                    onClick={handleNavigation}
                                    id='today'>
                                        {Navbar.todayButton}
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    name="expenses"
                                    onClick={handleNavigation}
                                    id='expenses'
                                >
                                    {Navbar.expensesButton}
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    name="settings"
                                    onClick={handleSettingsOpen}
                                    id='settings'>
                                        <SettingsIcon />
                                </MenuItem>
                                </>
                                : ''}
                            </Menu>
                            <div className={classes.language} variant='contained' onClick={() => setLanguage('english')}>🇬🇧</div>
                            <div className={classes.language} variant='contained' onClick={() => setLanguage('japanese')}>🇯🇵</div>
                        </div>
                        {window.innerWidth >= 460
                        ?
                        <div className={classes.toolbarRight}>
                            {data && <Button
                                color={location.pathname === '/today' ? 'primary' : 'inherit'}
                                name="today"
                                id="today"
                                variant={location.pathname === '/today' ? 'contained' : 'text'}
                                onClick={handleNavigation}
                            >
                                {Navbar.todayButton}
                                        </Button>}
                            {data && <Button
                                color={location.pathname === '/expenses' ? 'primary' : 'inherit'}
                                name="expenses"
                                id="expenses"
                                variant={location.pathname === '/expenses' ? 'contained' : 'text'}
                                onClick={handleNavigation}
                            >
                                {Navbar.expensesButton}
                                        </Button>}
                            {data && <Button
                                color={settingsOpen ? 'primary' : 'inherit'}
                                name="settings"
                                variant={settingsOpen ? 'contained' : 'text'}
                                onClick={handleSettingsOpen}>
                                <SettingsIcon />
                            </Button>}
                        </div>
                        : '' }
                    </Toolbar>
                    <Dialog open={loginOpen} onClose={handleClose}>
                        <Login setLoginOpen={setLoginOpen} />
                    </Dialog>
                    <Dialog open={signinOpen} onClose={handleClose}>
                        <Signin />
                    </Dialog>
                    <Menu
                        open={Boolean(settingsOpen)}
                        anchorEl={settingsOpen}
                        onClose={handleClose}
                        keepMounted
                    >
                        <div className={classes.settingsMenu}>
                            <Settings />
                            <Button className={classes.settingsMenuCloseButton} onClick={handleClose} color='primary' variant='contained'>{Navbar.settingsCloseButton}</Button>
                        </div>
                    </Menu>
                </AppBar>
            </ThemeProvider>
        </div>

    );
};

export default withFetch(Nav);