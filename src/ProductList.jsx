import React, { useState } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice'; // Import Redux action

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // ... (KEEP YOUR ENTIRE plantsArray HERE EXACTLY AS YOU HAVE IT) ...
    const plantsArray = [
        // YOUR ARRAY OF PLANTS GOES HERE
    ];

    const styleObj = { /* Your styles */ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' };
    const styleObjUl = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1100px' };
    const styleA = { color: 'white', fontSize: '30px', textDecoration: 'none' };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); 
    };
    
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false); // Show the plant grid
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (plant) => {
        // Convert "$15" to "15" for Redux price math
        const priceNum = plant.cost.replace('$', '');
        
        // Redux payload
        const plantToAdd = {
            id: plant.name, // Using name as ID since your data doesn't have unique IDs
            name: plant.name,
            price: parseFloat(priceNum),
            image: plant.image,
            cost: plant.cost // Keep original string for display
        };
        dispatch(addItem(plantToAdd));
    };

    // Check if item is already in cart to disable button
    const isItemInCart = (plantName) => {
        return cartItems.some(item => item.id === plantName);
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" style={{height: "50px"}} />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                        <h1 className='cart' style={{ position: 'relative', margin: 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68"><rect width="156" height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                            {/* Dynamic Cart Count Badge */}
                            <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', borderRadius: '50%', padding: '5px 10px', fontSize: '16px' }}>
                                {cartItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </h1>
                    </a></div>
                </div>
            </div>
            
            {!showCart ? (
                <div className="product-grid" style={{ padding: '20px' }}>
                    {/* MAP THROUGH CATEGORIES AND PLANTS */}
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 style={{ color: '#2e7d32', textAlign: 'center', marginTop: '20px' }}>{category.category}</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                                {category.plants.map((plant, plantIndex) => (
                                    <div key={plantIndex} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '250px', textAlign: 'center', background: 'white' }}>
                                        <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{plant.cost}</p>
                                        <button 
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={isItemInCart(plant.name)}
                                            style={{ padding: '10px 20px', backgroundColor: isItemInCart(plant.name) ? '#a5d6a7' : '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: isItemInCart(plant.name) ? 'not-allowed' : 'pointer', width: '100%' }}
                                        >
                                            {isItemInCart(plant.name) ? 'Added' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;