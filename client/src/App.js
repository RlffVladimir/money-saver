import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';

import Nav from './Nav';
import Page from './Page';
import Today from './Today';
import Settings from './Settings';
import NewExpense from './NewExpense';
import History from './History';
import Button from '@material-ui/core/Button';


// const seedExpenses = [
//   {
//       date: '1st March',
//       category: 'food',
//       amount: '3000'
//   },
//   {
//       date: '2nd March',
//       category: 'transport',
//       amount: '400'
//   },
//   {
//       date: '3rd March',
//       category: 'food',
//       amount: '1500'
//   },
// ]



function App() {
  const [totalMoney, setTotalMoney] = useState('');
  const [monthGoal, setMonthGoal] = useState('');
  const [expenses, setExpenses] = useState('');
  const [currentDate, setCurrentDate] = useState({});  

  const fetchData = async () => {
    const totalMoneyRes = await axios.get('http://localhost:5000/api/totalMoney');
    setTotalMoney({amount: totalMoneyRes.data[0].amount});
  }

  

  useEffect(() => {
    fetchDate();
    fetchMonthGoal();
    fetchExpenses();
  }, [])

  const fetchDate = () => {
    let today = new Date();
    const day = String(today.getDate());
    const month = String(today.getMonth() + 1); //January is 0!
    const year = String(today.getFullYear());
    today = year + '/' + month + '/' + day;
    setCurrentDate({
      year,
      month,
      day
    })
  }

  const fetchMonthGoal = async () => {
    const monthGoalRes = await axios.get('http://localhost:5000/api/goal');
    const currentMonthGoal = monthGoalRes.data.filter(monthGoal => {
      return monthGoal.date.month == currentDate.month && monthGoal.date.year == currentDate.year;
    })[0];
    setMonthGoal(currentMonthGoal);
  }

  const fetchExpenses = async () => {
    const expensesRes = await axios.get('http://localhost:5000/api/expenses');
    console.log(expensesRes.data);
    setExpenses(expensesRes.data);
  }
  

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Page><Today totalMoney={totalMoney} monthGoal={monthGoal} currentDate={currentDate} /></Page>
          </Route>
          <Route exact path='/settings'>
            <Page><Settings
              totalMoney={totalMoney}
              monthGoal={monthGoal}
              currentDate={currentDate}
            />
            </Page>
          </Route>
          <Route exact path='/new-expense'>
            <Page><NewExpense expenses={expenses} currentDate={currentDate} /></Page>
          </Route>
          <Route exact path='/history'>
            <Page><History /></Page>
          </Route>
          <Route exact >
            <Page><Today totalMoney={totalMoney} monthGoal={monthGoal} currentDate={currentDate} /></Page>
          </Route>
        </Switch>
        <Nav />
      </Router>
    </div>
  );
}

export default App;
