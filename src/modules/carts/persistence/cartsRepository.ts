import { Cart } from '../types/cartsTypes';
import { cartModel } from './models/cartsModel';

export default class CartManager {
  //Recibir Carro por Id
  getCartById = async (cid: string): Promise<Cart> => {
    try {
      const findedCart = await cartModel.findById(cid);
      return findedCart as unknown as Cart;
    } catch (error) {
      console.error(`Error repository: ${error}`);
      throw new Error(`Error: Internal server error`);
    }
  };

  //Crear un nuevo Carro
  createCart = async (): Promise<Cart> => {
    try {
      const newCart = await cartModel.create({ products: [] });
      return newCart as unknown as Cart;
    } catch (error) {
      console.error(`Error repository: ${error}`);
      throw new Error(`Error: Internal server error`);
    }
  };

  //Modificar completamente un carro(No hay persistencia entre la versión anterior y la versión nueva del carro)
  updateOrPushInCart = async (
    pid: string,
    cid: string,
    quantity: number
  ): Promise<Cart> => {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      if (!cart) throw new Error(`Cart ${cid} doesn't exist`);
      const existingProduct = cart.products.find(
        p => p.product?.toString() === pid
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity: quantity });
      }
      cart.save();
      const cartWithSimpleProducts: Cart = {
        products: cart.products.map(p => ({
          product: p.product?.toString() || 'unknown',
          quantity: p.quantity,
        })),
      };
      return cartWithSimpleProducts;
    } catch (error) {
      console.error(`Error repository: ${error}`);
      throw new Error(`Error: Internal server error`);
    }
  };

  //Borrar un carro
  deleteCart = async (cid: string): Promise<string> => {
    try {
      await cartModel.findByIdAndDelete(cid);
      console.error('Error repository: ${');
      return 'Cart has been deleted.';
    } catch (error) {
      console.error(`Error repository: ${error}`);
      throw new Error(`Error: Internal server error`);
    }
  };
}
