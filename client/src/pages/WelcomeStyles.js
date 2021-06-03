import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
    },
    title: {
        margin: '2rem 2rem 0.5rem 2rem',
    },
    subtitle: {
        marginBottom: '3rem',
    },
    signinSuccess: {
        color: 'green',
        textAlign: 'center',
        margin: '2rem',
    },
    buttons: {

    },
    button: {
        margin: '10px',
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    tiles: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            marginBottom: '3rem'
        },
    },
    tile: {
        width: '250px',
        height: '35vh',
        margin: '1rem',
        borderRadius: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 0.4s',
        cursor: 'pointer',
        '& span': {
            position: 'relative',
            fontSize: '2rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            top: '40px',
            fontWeight: '100'
        },
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            bottom: '5px',
            transition: 'all 0.4s',
            '& svg': {
                opacity: 1,
                transition: 'all 0.7s'
            }
        },
        '&:active': {
            transform: 'translateY(-1px)',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            paddingBottom: '1.5rem',
        },
    },
    today: {
        backgroundColor: 'rgba(100,100,150, 0.3)'
    },
    expenses: {
        backgroundColor: 'rgba(200,150,200, 0.3)'

    },
    icon: {
        fontSize: 100,
        opacity: '0.5',
        transition: 'all 0.5s'
    },
    addExpenseLabel: {
        fontSize: '1.5rem',
        position: 'fixed',
        bottom: '65px',
        right: '30px',
        fontWeight: '100',
        backgroundColor: 'rgba(50,50,200,0.3)',
        borderRadius: '10%',
        padding: '1rem',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
}));