import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({
    navbar: {
        position: 'sticky',
        bottom: '0',
        marginBottom: '0',
        width: '100%',
        flexGrow: '1',
        backgroundColor: 'brown'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    toolbarLeft: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        margin: '5px 2rem 5px 5px',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    language: {
        fontSize: '1.5rem',
        width: '40px',
        height: '40px',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItem: 'center',
        margin: '5px',
        borderRadius: '50%',
        transition: '0.2s',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.6)',
            transition: '0.2s'
        }
    },
    toolbarRight: {
        '& button': {
            margin: '0'
        }
    },
    settingsMenu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    settingsMenuCloseButton: {
        margin: '0.5rem',
        alignSelf: 'end',
    }
}));