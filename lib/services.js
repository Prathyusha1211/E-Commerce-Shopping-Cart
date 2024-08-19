import axios from "axios";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getProduct = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/products/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCart = async () => {
  try {
    const res = await axios.get(`${API_URL}/cart`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const addProductToCart = async (product) => {
  try {
    const res = await axios.post(`${API_URL}/cart`, product);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProductFromCart = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/cart`, { data: { id } });
    return res;
  } catch (err) {
    console.log("error", err);
    return false;
  }
};

export const updateProductQuantity = async (product) => {
  try {
    const res = await axios.put(`${API_URL}/cart`, product);
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};
