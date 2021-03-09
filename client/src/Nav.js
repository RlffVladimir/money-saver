import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TodayIcon from '@material-ui/icons/Today';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';

const useStyles = makeStyles({
    root: {
        position: 'sticky',
        bottom: '0',
        marginBottom: '0',

    },
})

function Nav() {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = useState('today')

    const handleNavigation = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        history.push(`/${value}`)
    })

    return (
        <div className={classes.root}>
            <BottomNavigation value={value} onChange={handleNavigation} showLabels>
                <BottomNavigationAction label="Today" icon={<TodayIcon />} value='today'/>
                <BottomNavigationAction label="New" icon={<AddCircleIcon />} value='new-expense'/>
                <BottomNavigationAction label="History" icon={<HistoryIcon />} value='history'/>
                <BottomNavigationAction label="Settings" icon={<SettingsIcon />} value='settings'/>
            </BottomNavigation>
        </div>
    );
};

export default Nav;