import React from 'react';
import numberWithCommas from '../utils/numberWithCommas';

function withStats(StatComponent, props) {

    return function StatWrapped(props) {

        const {data} = props;

        let thisUserTotalMoney;
        try {
            thisUserTotalMoney = (
                data.totalMoney[0].amount
            );
        } catch {
            thisUserTotalMoney = null;
        }
        
        let thisUserMonthGoal;
        try {
            thisUserMonthGoal = (
                data.monthGoal.filter(g => g.date.month === data.currentDate.month)[0].goal
            );
        } catch {
            thisUserMonthGoal = null;
        }
        
        let totalExpensesAmount;
        try {
            totalExpensesAmount = (
                data.expenses.filter(e => e.user.username === data.user && e.date.month === data.currentDate.month && e.date.year === data.currentDate.year)
                                .map(e => e.amount)
                                .reduce((acc, curVal) => parseInt(acc) + parseInt(curVal))
            );
        } catch {
            totalExpensesAmount = null;
        }

        let expensesFromName1;
        try {
            expensesFromName1 = data.expenses.filter(e => e.purchaser.name === data.names[0].name
                                                    && e.date.month === data.currentDate.month
                                                    && e.date.year === data.currentDate.year)
                            .map(e => e.amount)
                            .reduce((acc, curVal) => parseInt(acc) + parseInt(curVal))

        } catch {
            expensesFromName1 = null;
        }

        let expensesFromName2;
        try {
            expensesFromName2 = data.expenses.filter(e => e.purchaser.name === data.names[1].name
                                                    && e.date.month === data.currentDate.month
                                                    && e.date.year === data.currentDate.year)
                            .map(e => e.amount)
                            .reduce((acc, curVal) => parseInt(acc) + parseInt(curVal))

        } catch {
            expensesFromName2 = null;
        }
        

        const limit = (
            thisUserMonthGoal - totalExpensesAmount
        );
        const endOfMonth = (
            parseInt(thisUserTotalMoney) + parseInt(limit)
        );


        let stats= { 
            thisUserTotalMoney: thisUserTotalMoney !== null ? numberWithCommas(thisUserTotalMoney) : null,
            endOfMonth: numberWithCommas(endOfMonth),
            thisUserMonthGoal: thisUserMonthGoal !== null ? numberWithCommas(thisUserMonthGoal) : null,
            limit: numberWithCommas(limit),
            totalExpensesAmount: totalExpensesAmount !== null ? numberWithCommas(totalExpensesAmount) : null,
            expensesFromName1: expensesFromName1 !== null ? numberWithCommas(expensesFromName1) : null,
            expensesFromName2: expensesFromName2 !== null ? numberWithCommas(expensesFromName2) : null
        }       

        
        return <StatComponent {...props} stats={stats}/>  
    }
}

export default withStats;