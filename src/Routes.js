import Login from 'pages/Login';
import Feira from 'pages/Feira';
import Carrinho from 'pages/Carrinho';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { UserProvider } from 'common/context/User';
import { ShoppingCartProvider } from 'common/context/ShoppingCart';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route exact path="/">
            <Login />
          </Route>
          <ShoppingCartProvider>
            <Route path={"/feira"}>
              <Feira />
            </Route>
            <Route path={"/carrinho"}>
                <Carrinho />
            </Route>
          </ShoppingCartProvider>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
}