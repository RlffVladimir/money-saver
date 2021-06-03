import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fetching from '../components/Fetching';
import decode from 'jwt-decode';
import {API_URL} from '../constants';

export default function withFetch(WrappedComponent, props) {
    return function WithFetch (props) {
        
        const date = new Date();
        const [currentDate] = useState({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        })

        const [data, setData] = useState(JSON.parse(localStorage.getItem('data')));

        const [isFetching, setIsFetching] = useState(true)
        const token = localStorage.getItem('token');

        const fetchData = () => {
            setIsFetching(true);
            axios.all([
                axios.get(API_URL + 'user', {headers: {"x-auth-token": token}}),
                axios.get(API_URL + 'totalMoney'),
                axios.get(API_URL + 'goal'),
                axios.get(API_URL + 'expenses')
            ])
            .then(axios.spread((userRes, totalMoneyRes, monthGoalRes, expensesRes) => {
                setData({
                    totalMoney: totalMoneyRes.data.filter(d =>  d.user === userRes.data.username),
                    monthGoal: monthGoalRes.data.filter(g => g.user === userRes.data.username),
                    expenses: expensesRes.data.filter(e => e.user.username === userRes.data.username),
                    user: userRes.data.username,
                    names: [...userRes.data.names],
                    token,
                    currentDate
                })
                window.localStorage.setItem('data', JSON.stringify(data))
            }))
            .then(() => {
                setIsFetching(false);
            })
            .catch(e => {
                console.log(e);
                setIsFetching(false);
            })
        } 

        useEffect(() => {
            if (token) {
                const decoded = decode(token);
                if(decoded.exp < Date.now() / 1000) {
                    localStorage.removeItem('token');
                } else {
                    fetchData()
                }
            } else {
                setIsFetching(false);
            }
        }, [])
        

        while(isFetching === true) {
            return <Fetching />
        }
        return <WrappedComponent {...props} fetchData={fetchData} data={data} setData={setData} isFetching={isFetching} setIsFetching={setIsFetching}/>
    }
}