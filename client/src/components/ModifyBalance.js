import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { Slider, Input, Button, Typography } from '@material-ui/core/';
import axios from 'axios';
import { API_URL } from '../constants';
import translation from '../translation';
import {LanguageContext, LanguageProvider} from '../contexts/LanguageContext';
import withFetch from '../hoc/withFetch';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '300px',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        [theme.breakpoints.down('xs')]: {
            width: '300px',
            padding: '0',
        },
    },
}))

function ModifyBalance({ data }) {
    const {language} = useContext(LanguageContext);
    const classes = useStyles();
    const [value, setValue] = useState(data.names[0].balance);

    const { ModifyBalance } = translation[language];

    const handleSliderChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleInputChange = (event) => {
        if (event.target.value !== event.target.value) {
            setValue(0)
        } else {
            setValue(event.target.value)
        }
    }

    const handleSubmit = async () => {
        console.log('request to ' + API_URL + 'user/balance')
        await axios.put(API_URL + 'user/balance', {
            username: data.user,
            newBalance: value
        })
        window.location.reload(true);
    }

    const marks = [
        {
            value: -15000,
            label: '¥-15000',
        },
        {
            value: -7000,
            label: '¥-7000',
        },
        {
            value: 0,
            label: '¥0',
        },
        {
            value: 7000,
            label: '¥7000',
        },
        {
            value: 15000,
            label: '¥15000',
        },
    ];


    return (
        <div className={classes.root}>
            <Typography
              variant='h5'
              style={{margin: '2rem'}}
            >
                {`${ModifyBalance.title.part1}${data.names[0].name}${ModifyBalance.title.part2}`}
            </Typography>
            {window.innerWidth < 400 
            ? ''
            :
            <Slider
                value={typeof value === 'number' ? value : 0}
                valueLabelDisplay={`${data.names[0].name}'s balance`}
                onChange={handleSliderChange}
                marks={marks}
                min={-20000}
                max={20000}
            />
            }   
            <Input
                value={value}
                onChange={handleInputChange}
                style={{margin: '1rem'}}
            />
            <Typography 
              style={{margin: '2rem 0 1rem 0'}}
              variant='h6'
            >
                {`${data.names[1].name}: ¥${-value}`}
            </Typography>
            <Button 
              variant='contained' 
              color='primary' 
              onClick={handleSubmit}
              style={{margin: '0.5rem'}}
            >
                {ModifyBalance.button}
            </Button>
        </div>
    )
}

export default withFetch(ModifyBalance);