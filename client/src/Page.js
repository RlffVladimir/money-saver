import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minHeight: '92.8vh',
        backgroundColor: 'teal',
        padding: '1px 1rem',
        fontFamily: 'roboto',
    
    },
});

function Page({ children }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {children}
        </div>

    );
};

export default Page;