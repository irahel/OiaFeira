import { useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import Produto from 'components/Produto';
import { useShoppingCartContext } from 'common/context/ShoppingCart';
import { usePaymentContext } from 'common/context/Payment';
import { UserContext } from 'common/context/User';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { shoppingCart, totalValue } = useShoppingCartContext();
  const { payment, paymentTypes, handlePaymentChange } = usePaymentContext();
  const { balance = 0 } = useContext(UserContext);
  const finalBalance = useMemo(() => balance - totalValue, [balance, totalValue]);

  const history = useHistory();
  return (
    <Container>
      <Voltar
        onClick={() => history.goBack() } />
      <h2>
        Carrinho
      </h2>
      {
        shoppingCart.map((product) => (
          <Produto
            {...product}
            key={product.id}
            />
        ))
      }
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={payment.id}
          onChange={(e) => handlePaymentChange(e.target.value)} >
            {
              paymentTypes.map((paymentType) => (
                <MenuItem
                  value={paymentType.id}
                  key={paymentType.id}>
                    {paymentType.name}
                </MenuItem>))
            }
        </Select>

      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {totalValue.toFixed(2)} </span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(balance).toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {finalBalance.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
        disabled={finalBalance < 0 || shoppingCart.length === 0}
      >
         {finalBalance < 0 ? ' ̶C̶o̶m̶p̶r̶a̶r̶' : 'Comprar'}
       </Button>
       {
        shoppingCart.length === 0 && (
          <h4> Seu carrinho está vazio </h4>
        ) ||
        finalBalance < 0 && (
          <h4> Saldo insuficiente </h4>
        )
       }

        <Snackbar
          anchorOrigin={
            {
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;