import { Container } from './styles';
import { memo, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { ShoppingCartContext } from 'common/context/ShoppingCart';

function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);

  function handleAddToCart(newProduct) {
    const productExists = shoppingCart.some(product => product.id === newProduct.id);
    if(!productExists) {
      newProduct.quantidade = 1;
      return setShoppingCart(previousShoppingCart => [...previousShoppingCart, newProduct])
    }
    setShoppingCart(previousShoppingCart => previousShoppingCart.map(product => {
      if(product.id === newProduct.id) {
        return {
          ...product,
          quantidade: product.quantidade + 1
        }
      }
      return product;
    }))
  }
  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
          >
            <RemoveIcon />
          </IconButton>
          <IconButton 
            onClick={
              () => handleAddToCart({nome, foto, id, valor})
              }>
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)