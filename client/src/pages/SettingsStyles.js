import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    settings: {
        width: '100%',
    },
    title: {
        textAlign: 'center',
        margin: '1rem',
    },
    card: {
        width: '30%'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    forms: {
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1rem',
    },
    formTitle: {
        fontSize: '1.2rem',
        alignSelf: 'start'
    },
    modifyButton: {
        marginTop: '1rem',
    },
    dialog: {
        
    },
    dialogContent: {
        margin: '30px 20px',
    },
    dialogButton: {
        margin: '20px 10px'
    }
}))