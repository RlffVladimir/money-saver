import React from 'react';
import CalendarObject from 'react-calendar';

function Calendar ({selectedDate, setSelectedDate, data}) {
    const onChange = date => setSelectedDate(date);

    return (
            <CalendarObject
                onChange={onChange}
                value={selectedDate}
                minDetail='decade'
                showNeighboringMonth={false}
                tileContent={({ activeStartDate, date, view }) => {
                    const thisDayExpense = data.expenses.filter(expense => {
                        return expense.date.day === date.getDate()
                                && expense.date.month === date.getMonth() + 1
                                && expense.date.year === date.getFullYear()
                    })
                    const thisMonthExpense = data.expenses.filter(expense => {
                        return expense.date.month === date.getMonth() + 1
                                && expense.date.year === date.getFullYear()
                    })
                    const thisYearExpense = data.expenses.filter(expense => {
                        return expense.date.year === date.getFullYear()
                    })
                    
                    if (view === 'month'){
                        return thisDayExpense.length > 0
                        ? <p style={{ color: 'red' }}>{thisDayExpense.length}</p>
                        : <p style={{ opacity: '0.3' }}>0</p>
                    }   else if (view === 'year') {
                        return thisMonthExpense.length > 0
                        ? <p style={{ color: 'red' }}>{thisMonthExpense.length}</p>
                        : <p style={{ opacity: '0.3' }}>0</p>
                    }   else if (view === 'decade') {
                        return thisYearExpense.length > 0
                        ? <p style={{ color: 'red' }}>{thisYearExpense.length}</p>
                        : <p style={{ opacity: '0.3' }}>0</p>
                    }
                }}
            />
    )
}

export default Calendar;