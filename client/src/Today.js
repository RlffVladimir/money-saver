import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    root: {
        
    },
})

// const reqMonths = async () => {
//     try {
//         const instance = axios.create({
//             withCredentials: true,
//           })
//         const res = await instance.get('http://localhost:5000/api/months');
//         console.log(res.data);
//     } catch (e) {
//         console.log(e)
//     }   
// }

const reqMonths = async (month) => {
    try {
        console.log(month);
        const instance = axios.create({
            withCredentials: true,
          })
        const res = await instance.post('http://localhost:5000/api/months', month);
        console.log('success' + res);
    } catch (e) {
        console.log(e)
    }   
}


function Today ({totalMoney, objectiveInAMonth}) {
    const classes = useStyles();
    const [currName, setCurrName] = useState('');
    const [currYear, setCurrYear] = useState('');
    const [month, setMonth] = useState({}); 

    const handleSubmit = () => {
        setMonth({
            name: currName,
            year: currYear
        })
        reqMonths(month)
    }

    const handleChangeName = e => [
        setCurrName(e.target.value)
    ]
    const handleChangeYear = e => [
        setCurrYear(e.target.value)
    ]
    useEffect(() => {
        // reqMonths();
    })
    return (
        <div className={classes.root}>
            <h1>Today</h1>
            <p>Current month is: </p>
            <p>Your total money is {totalMoney}</p>
            <p>Your objective in a month is {objectiveInAMonth}</p>
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator 
                  label='Name' 
                  value={currName}
                  onChange={handleChangeName}
                />
                <TextValidator 
                  label='Year' 
                  value={currYear}
                  onChange={handleChangeYear}
                />
                <Button variant='contained' type='submit' color='primary'>Submit</Button>
            </ValidatorForm>
        </div>
    );
};

export default Today;