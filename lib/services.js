import axios from "axios"
export const getProducts = async () => {
    try{
        const res = await axios.get("http://localhost:3000/api/products");
        return res.data;
    }
    catch(err){
        throw err;
    }
}


export const getProduct = async (id) => {
    try{
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        return res.data;
    }
    catch(err){
        console.log(err);
    }
}

export const getCart = async () => {
    try{
        const res = await axios.get("http://localhost:3000/api/cart");
        return res.data;
    }
    catch(err){
        throw err;
    }
}

export const addProductToCart = async (product) => {
    try{
        const res = await axios.post("http://localhost:3000/api/cart",product);
    
        return res.data;
    }
    catch(err){
        throw err;
    }
}

export const deleteProductFromCart = async (id) => {
    try{
        const res = await axios.delete("http://localhost:3000/api/cart",{data:{id}});
        return res.data;
    }
    catch(err){
        console.log("error in deleteProductFromCart");
        throw err;
    }
}

export const updateProductQuantity = async (product) => {
    try{
        const res = await axios.put("http://localhost:3000/api/cart",product);
        return res.data;
    }
    catch(err){
        throw err;
    }
}

