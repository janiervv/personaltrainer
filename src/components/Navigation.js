
import React from 'react';
import Customerlist from './Customers'
import Homepage from './Homepage'
import TrainingsList from './Trainings'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default function Navigation() {
  return (

    <Router>

      <div>
        <div className="bluebar">
        <nav className="links">
              <Link className="item" to="/">Home </Link>
              <Link className="item" to="/customers">Customers</Link>
              <Link className="item" to="/trainings">Trainings</Link>
        </nav>
        </div>

        <Switch>

          <Route path="/customers">
            <Customerlist />
          </Route>

          <Route path="/trainings">
            <TrainingsList />
          </Route>

          <Route path="/">
            <Homepage />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

