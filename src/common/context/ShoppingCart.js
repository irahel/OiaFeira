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

    function changeQuantity(id, quantity) {
        setShoppingCart(previousShoppingCart => previousShoppingCart.map(product => {
            if(product.id === id) {
              product.quantidade += quantity;
              return product;
            }
            return product;
        }))
    }

    function handleAddToCart(newProduct) {
        const productExists = shoppingCart.some(product => product.id === newProduct.id);
        if(!productExists) {
          newProduct.quantidade = 1;
          return setShoppingCart(previousShoppingCart => [...previousShoppingCart, newProduct])
        }
        changeQuantity(newProduct.id, 1);
      }

      function handleRemoveToCart(id){
        const productInShoppingCart = shoppingCart.find(product => product.id === id);
        if (!productInShoppingCart) {
          return;
        }
        const isLastProduct = productInShoppingCart.quantidade === 1;
        if (isLastProduct) {
          return setShoppingCart(previousShoppingCart => previousShoppingCart.filter(product => product.id !== id))
        }
        changeQuantity(id, -1);
      }

    return {
        shoppingCart,
        setShoppingCart,
        handleAddToCart,
        handleRemoveToCart
    }

}