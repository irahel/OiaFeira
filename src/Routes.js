import Login from 'pages/Login';
import Feira from 'pages/Feira';
import Carrinho from 'pages/Carrinho';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { UserProvider } from 'common/context/User';
import { ShoppingCartProvider } from 'common/context/ShoppingCart';
import { PaymentProvider } from 'common/context/Payment';

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
            <PaymentProvider>
              <Route path={"/carrinho"}>
                  <Carrinho />
              </Route>
            </PaymentProvider>
          </ShoppingCartProvider>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
}