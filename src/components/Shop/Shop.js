import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('products.json')//loading data from public folder
        .then(res =>res.json())
        .then(data => setProducts(data))
    },[])

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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;