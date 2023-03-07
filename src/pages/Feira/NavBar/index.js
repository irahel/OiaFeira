import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useShoppingCartContext } from 'common/context/ShoppingCart';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const { productsQuantity } = useShoppingCartContext();
  const history = useHistory();

  return (
    <Nav>
      <Logo
        onClick={() => history.push('/')}
        cursor="pointer"
      />
      <IconButton
        disabled={productsQuantity === 0}
        onClick={() => history.push('/carrinho') }
        >
        <Badge
          color="primary"
          badgeContent={productsQuantity}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}