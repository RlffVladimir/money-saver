import {makeStyles} from '@material-ui/styles';

export default makeStyles((theme) => ({
    badge: {
        minHeight: '130px',
        backgroundColor: '#fffffd',
        borderRadius: '5px',
        padding: '10px',
        margin: '5px',
        boxShadow: '2px 2px 2px rgb(0,0,0,0.2)',
        boxSizing: 'border-box',
        display: 'flex',
    },
    leftColumn: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        [theme.breakpoints.down('md')]: {
            width: '60%',
        },
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginRight: '1rem',
    },
    data: {
        fontSize: '2rem',
        fontWeight: '300',
    },
    rightColumn: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            width: '40%',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.8rem',
        }
    },
    button: {
        width: '50px',
        alignSelf: 'end'
    },
    date: {
        textAlign: 'end',
    }
}))