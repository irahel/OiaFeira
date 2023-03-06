import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useShoppingCartContext } from 'common/context/ShoppingCart';

function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
  const { shoppingCart, handleAddToCart, handleRemoveToCart } = useShoppingCartContext();
  const productInShoppingCart = shoppingCart.find(product => product.id === id);

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
            onClick={
              () => handleRemoveToCart(id)
            }
            disabled={!productInShoppingCart || productInShoppingCart?.quantidade === 0}
          >
            <RemoveIcon />
          </IconButton>
          <p>{productInShoppingCart?.quantidade || 0}</p>
          <IconButton
            color='primary'
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