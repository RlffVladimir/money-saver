import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    signin: {
        margin: '50px',
        [theme.breakpoints.down('xs')]: {
            margin: '30px',
        }
    },
    title: {
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        margin: '3rem',
        textAlign: 'center',
        [theme.breakpoints.down('xs')] : {
            margin: '0',
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    field: {
        margin: '0.3rem 0'
    },
    button: {
        margin: '3rem 0'
    }
}))