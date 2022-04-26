import {createContext,useState,useEffect} from 'react';
import PRODUCTS from '../shop-data.json';


export const ProductsContext = createContext({
    products:[],
    setProducts: ()=>[],
});

export const ProductsProvider=({children})=>{
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};

    // useEffect(()=>{
    //     const products = getProducts();
    //     setProducts(products);
    //     return products;
    // },[]);

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}