import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    expensePage: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    calendarAndExpenses: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    title: {
        margin: '3rem',
        [theme.breakpoints.down('md')]: {
            margin: '2rem',
        },
    },
    expenses: {
        padding: '1px 20px 5px 20px',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        height: '60vh',
        borderTop: '2px solid rgba(50,50,50,0.3)',
        borderBottom: '2px solid rgba(50,50,50,0.3)',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            margin: '1rem 0 0 0',
            flexDirection: 'row',
            height: '150px',
            padding: '8px 0 8px 0',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '6rem'
        }
    },
    expenseAmount: {
        padding: '0px',
        margin: '0'
    },
    expenseCategory: {
        margin: '0',
        padding: '0'
    },
    calendar: {
        display: 'flex',
        justifyContent: 'center',
        height: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    }
    
}));