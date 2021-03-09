import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from './Nav';
import Page from './Page';
import Today from './Today';
import Settings from './Settings';
import NewExpense from './NewExpense';
import History from './History';

const seedExpenses = [
  {
      date: '1st March',
      category: 'food',
      amount: '3000'
  },
  {
      date: '2nd March',
      category: 'transport',
      amount: '400'
  },
  {
      date: '3rd March',
      category: 'food',
      amount: '1500'
  },
]

function App() {
  const savedData = JSON.parse(window.localStorage.getItem('data'))
  const [totalMoney, setTotalMoney] = useState(savedData ? savedData.totalMoney : 0);
  const [objectiveInAMonth, setObjectiveInAMonth] = useState(savedData ? savedData.objectiveInAMonth : 0);
  const [expenses, setExpenses] = useState(savedData ? savedData.expenses : seedExpenses);

  useEffect(() => {
    const data = {
      totalMoney,
      objectiveInAMonth,
      expenses
    }
    window.localStorage.setItem('data', JSON.stringify(data))
  })

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Page><Today totalMoney={totalMoney} objectiveInAMonth={objectiveInAMonth} /></Page>
          </Route>
          <Route exact path='/settings'>
            <Page><Settings
              totalMoney={totalMoney}
              setTotalMoney={setTotalMoney}
              objectiveInAMonth={objectiveInAMonth}
              setObjectiveInAMonth={setObjectiveInAMonth}
            />
            </Page>
          </Route>
          <Route exact path='/new-expense'>
            <Page><NewExpense expenses={expenses} setExpenses={setExpenses} /></Page>
          </Route>
          <Route exact path='/history'>
            <Page><History /></Page>
          </Route>
          <Route exact >
            <Page><Today totalMoney={totalMoney} objectiveInAMonth={objectiveInAMonth} /></Page>
          </Route>
        </Switch>
        <Nav />
      </Router>
    </div>
  );
}

export default App;
