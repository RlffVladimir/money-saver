import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Nav from './nav/Nav';
import Page from './components/Page';
import Today from './pages/Today';
import Expenses from './pages/Expenses'
import Welcome from './pages/Welcome';
import NewExpense from './components/NewExpense';
import { LanguageProvider } from './contexts/LanguageContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

}))

function App({ user, setUser, setToken }) {
  const classes = useStyles();
  const [page, setPage] = useState('welcome')

  return (
    <div className={classes.app}>
      <LanguageProvider>
          <Router>
            <Nav user={user} setUser={setUser} setToken={setToken} setPage={setPage} page={page} welcome={true} />
            <Switch>
              <Page>
                <Route exact path='/' component={Welcome} />
                <Route exact path='/today' component={Today} />
                <Route exact path='/expenses' component={Expenses} />
              </Page>
            </Switch>
            <NewExpense />
          </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
