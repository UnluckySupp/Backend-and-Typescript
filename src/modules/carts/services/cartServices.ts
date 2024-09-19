import CartManager from '../persistence/cartsRepository';
import { Cart } from '../types/cartsTypes';

const cartManager = new CartManager();

const getCartById = async (cid: string): Promise<Cart> => {
  try {
    return await cartManager.getCartById(cid);
  } catch (error) {
    console.error(`Error Services: ${error}`);
    throw new Error('Error: Internal server error');
  }
};

const createCart = async (): Promise<Cart> => {
  try {
    return await cartManager.createCart();
  } catch (error) {
    console.error(`Error Services: ${error}`);
    throw new Error('Error: Internal server error');
  }
};

const updateCart = async (
  cid: string,
  pid: string,
  quantity: number = 1
): Promise<Cart> => {
  try {
    return await cartManager.updateOrPushInCart(cid, pid, quantity);
  } catch (error) {
    console.error(`Error Services: ${error}`);
    throw new Error('Error: Internal server error');
  }
};

const deleteCart = async (cid: string): Promise<string> => {
  try {
    return await cartManager.deleteCart(cid);
  } catch (error) {
    console.error(`Error Services: ${error}}`);
    throw new Error('Error: Internal server error');
  }
};

export default { getCartById, createCart, updateCart, deleteCart };
