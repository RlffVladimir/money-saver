import React from 'react';
import makeStyles from './BadgeStyles';
import numberWithCommas from '../utils/numberWithCommas';
import {Button} from '@material-ui/core'

const useStyles = makeStyles;

function Badge ({text, data, purchaser, date, deleteExpense, id}) {
    const classes = useStyles();
    return (
        <div className={classes.badge}>
            <div className={classes.leftColumn}>
                <div className={classes.title}>
                    {text && text}
                </div>
                <div className={classes.data}>
                    {data && `¥${numberWithCommas(data)}`}
                </div>
                <div className={classes.purchaser}>
                    {purchaser}
                </div> 
            </div>
            
            <div className={classes.rightColumn}>
                {id && <Button className={classes.button} variant='outlined' color='secondary' onClick={() => deleteExpense(id)}>
                    X
                </Button> }
                <div className={classes.date}>
                        {date}
                </div>
            </div>
        </div>
    )
}

export default Badge;