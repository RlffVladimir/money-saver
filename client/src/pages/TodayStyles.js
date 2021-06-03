import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '80%',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            paddingLeft: '0',
        }
    },
    today: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '3rem 3rem 0 0',
        [theme.breakpoints.down('md')]: {
            width: '70%',
            flexDirection: 'column',
            margin: '0',
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            flexDirection: 'column',
            margin: '0',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            flexDirection: 'column',
            margin: '0',
        }
    },
    title: {
        textAlign: 'center',
        marginBottom: '2rem',
        [theme.breakpoints.down('md')]: {
            marginTop: '2rem'
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '2rem',
            fontSize: '2.4rem',
        }
    },
    card: {
        width: '90%',
        margin: '0 1rem 2rem 0',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            margin: '0',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0'
        }
    },
    date: {
        margin: '10px 2rem 20px 0',
        textAlign: 'end',
    },
    modifiableData: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    data: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'start',
            marginLeft: '2rem',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0',
            paddingLeft: '0',
        },
    },
    dataText: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: '1rem',
        }
    },
    dataRight: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        [theme.breakpoints.down('sm')]: {
            margin: '1rem 0 0 1rem',
            width: '100%',
            alignItems: 'start',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0',
        }
    },
    dataButton: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        justifySelf: 'center',
        [theme.breakpoints.down('xs')]: {
            alignSelf: 'start'
        }
    },
    dataGraph: {
        width: '300px',
        height: '440px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
    },
    dataNumber: {
        fontWeight: '800'
    },
    dataTitle: {
        margin: '1rem 0 0 1rem'
    },
    lastExpenses: {
        marginTop: '3rem',
        width: '30%',
        [theme.breakpoints.down('md')]: {
            width: '70%',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '5rem 0 0 0',
            width: '100%'
        }
    }
}))