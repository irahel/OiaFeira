import Login from 'pages/Login';
import Feira from 'pages/Feira';
import Carrinho from 'pages/Carrinho';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { UserProvider } from 'common/context/User';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <UserProvider>
              <Login />
          </UserProvider>
        </Route>
        <Route path={"/feira"}>
            <Feira />
        </Route>
        <Route path={"/carrinho"}>
            <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}