import React, {createContext, useContext, useState} from 'react';

const ProductsContext = createContext();

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    const saveProduct = (product) => { 
        setProducts(currentProducts => {
            //check if the product with the given ID already exists
            const index = currentProducts.findIndex(p => p.id === product.id);  
        
            if(index !== -1) {
                //Product exists ,replace it 
                const newProducts = [...currentProducts];
                newProducts[index] = product;
                return newProducts;
            } else {
                //Product doesn't exist, add it as a new product
                //if the product doesn't have an ID, generate a new one
                const newProducts = product.id ? product : {...product, id: Date.now()
                    };
                return [...currentProducts, newProducts];
            }
        });
    };


    return(
        <ProductsContext.Provider value={{products, setProducts, saveProduct}}>
            {children}
        </ProductsContext.Provider>
    );
};
