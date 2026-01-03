import { useState } from 'react';
import './Cart.css';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage.jsx';

function Cart({ cart, products, showCart, setShowCart, onUpdatedCart, onRemoveFromCart, isAdmin, onCheckout, onClearCartError, page, error }) {
  
  const [successMessage, setSuccessMessage] = useState(false);

  if (isAdmin) {
    return null; 
  }

  if(page === '/about') {
    return null;
  }

  const cartItems = Object.keys(cart || {}).map(id => {
    const product = products.find(product => String(product.id) === String(id));
    const quantity = cart[id];
      return product && quantity > 0 ? { ...product, quantity } : null;
  }).filter(Boolean) || [];

  const totalPrice = cartItems.reduce((sum, item) => sum + (Number(item.price)) * (Number(item.quantity)), 0).toFixed(2);
  const totalItems = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);

  function handleClearCartError() {
    setShowCart(!showCart)
    onClearCartError();
  }

  function handleSuccessMessage() {
    onCheckout();
    setSuccessMessage('Order placed successfully!');
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  }
    


  return (
    <div className="cart">
      
      <div className="shopping__cart">
        <img 
          src='/images/cart.png' 
          alt="A shopping cart icon" 
          className="cart__icon"
          onClick={handleClearCartError}
        />
          {totalItems > 0 && (
            <span className="item__count">{totalItems}</span>
          )}   
          {showCart && (               
            <div className="cart__items">                                               
              <button className="close__cart" onClick={() => setShowCart(false)}><img src='/images/cancel.png' alt="A cancel icon"/></button>
                <h2 className="cart__title">Your Cart</h2>
                {error && <ErrorMessage error={error}/>}
                {cartItems.length > 0 ? (
                  <ul>
                    {cartItems.map(item => (
                      <li key={item.id} className="item__info">
                        <img 
                          src={item.image} 
                          alt={item.alt}
                          className="item__img"                                  
                        />                                                           
                        <span className="item__title">{item.title}</span>
                        <span className="item__price">Price: ${item.price.toFixed(2)}</span>
                        <label className="item__quantity">
                          Quantity:
                            <input 
                              type="number"
                              min="1"
                              value={item.quantity} 
                              onChange={e => onUpdatedCart(item.id, Number(e.target.value))}                             
                            />
                        </label>
                        <Button                                     
                          type="button" 
                          visual="button"
                          onClick={() => onRemoveFromCart(item.id)}
                          className="delete__item" 
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                  ) : (
                      <p>Your cart is empty</p>
                    )}
                      {(cartItems.length > 0 && (
                         <div className="cart__total">Total: ${totalPrice}</div>
                      ))}
                      {successMessage && <SuccessMessage message={successMessage} />}
                      <Button 
                        type="button" 
                        visual="button" 
                        onClick={handleSuccessMessage}
                        className="checkout__button"
                      >
                        Checkout
                      </Button>                            
            </div>                
            )}
      </div>
    </div>
    );
}

export default Cart;