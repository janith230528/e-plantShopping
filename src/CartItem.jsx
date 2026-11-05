import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, deleteItem } from './CartSlice'; // Imported correct actions
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      // Remove the '$' sign and convert to number
      const priceNum = parseFloat(item.cost.replace('$', ''));
      total += priceNum * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Tells parent to hide cart and show plants
  };

  const handleIncrement = (item) => {
    // We re-dispatch addItem to increase quantity
    dispatch(addItem(item));
  };

  const handleDecrement = (item) => {
    // Dispatching removeItem decreases quantity by 1 (or removes if it hits 0)
    dispatch(removeItem(item.id));
  };

  const handleRemove = (item) => {
    // Dispatching deleteItem removes the whole plant type from the cart
    dispatch(deleteItem(item.id));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const priceNum = parseFloat(item.cost.replace('$', ''));
    return (priceNum * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      {/* DISPLAY TOTAL NUMBER OF PLANTS */}
      <h3 style={{ color: 'black' }}>
        Total Plants in Cart: {cart.reduce((total, item) => total + item.quantity, 0)}
      </h3>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        {/* CHECKOUT BUTTON */}
        <button className="get-started-button1" onClick={() => alert("Coming Soon!")}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;