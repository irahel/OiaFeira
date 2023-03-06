import { createContext, useState, useContext } from 'react';

export const ShoppingCartContext = createContext();

ShoppingCartContext.displayName = 'ShoppingCartContext';

export const ShoppingCartProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState([]);

    return(
    <ShoppingCartContext.Provider value={{shoppingCart, setShoppingCart}}>
        {children}
    </ShoppingCartContext.Provider>)
}

export const useShoppingCartContext = () => {
    const {shoppingCart, setShoppingCart} = useContext(ShoppingCartContext);

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

    return {
        shoppingCart,
        setShoppingCart,
        handleAddToCart
    }

}