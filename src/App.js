
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './component/Login';
import Home from './component/Home';
import Header from './component/Header';
import { getUserAuth } from './actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getUserAuth());

  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
