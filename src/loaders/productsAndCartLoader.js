import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async ()=>{
    //get products
    const productsData = await fetch('products.json');
    const products = await productsData.json()

    //get cart
    const savedCart = getStoredCart();
    return products;
}