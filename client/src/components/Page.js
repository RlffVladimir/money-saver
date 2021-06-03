import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme';
import makeStyles from './PageStyles';

const useStyles = makeStyles;

function Page({ children }) {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.page}>
                {children}
            </div>
        </ThemeProvider>
    );
};

export default Page;