import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    const products = useLoaderData();
    const [cart, setCart] = useState([]);

    const clearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    //loading cart data from local strorage
    useEffect(()=>{
        const storedCart = getStoredCart();
        const savedCrat = [];
        for(const id in storedCart){
            const addedProduct = products.find(product=>product.id === id)
            if (addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCrat.push(addedProduct)
            }
        }
        setCart(savedCrat);
    },[products])

    const handleAddToCart = (selectedProduct) =>{
        let newCart = [];
        const exists = cart.find(product=> product.id ===selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart,selectedProduct];
        }else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest,exists]
        }
        setCart(newCart);
        addToDb(selectedProduct.id);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart} //we can send props as function as well
                        ></Product> )
                }
            </div>
            <div className="cart-container">
            <Cart clearCart={clearCart} cart={cart}>
                    <Link to="/orders">
                        <button>Review Orders</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;