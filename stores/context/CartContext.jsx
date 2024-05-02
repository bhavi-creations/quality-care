import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cardInfo, setcardInfo] = useState([]);

  const addToCart = (item) => {
    // setcardInfo([...cardInfo, { ...item, quantity: 1 }]);
    setcardInfo((prevItems) => {
      const exists = prevItems.find(product => product.ID === item.ID);
      if (exists) {
        // Increment quantity if product exists
        return prevItems.map(product =>
          product.ID === item.ID ? { ...product, quantity: product.quantity + 1 } : item
        );
      }
      // Add new product to cart
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setcardInfo(cardInfo.filter((apple) => apple !== item));
  };

  return (
    <CartContext.Provider value={{ cardInfo, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
