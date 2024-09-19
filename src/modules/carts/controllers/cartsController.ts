import { Request, Response } from 'express';
import CartManager from '../persistence/cartsRepository';

const cartManager = new CartManager();

const getCartById = async (req: Request, res: Response): Promise<void> => {
  try {
    const findedProduct = await cartManager.getCartById(req.params.cid);
    res.status(200).json({ status: 'Success', payload: findedProduct });
  } catch (error) {
    console.error('Error: Controller error:error');
    if (error) res.status(400).json({ Error: 'Internal Server Error' });
  }
};

const createCart = async (_req: Request, res: Response): Promise<void> => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: 'Success', payload: newCart });
  } catch (error) {
    console.error('Error: Controller error:error');
    if (error) res.status(400).json({ Error: 'Internal Server Error' });
  }
};

const updateOrPushCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body;
    const updatedCart = await cartManager.updateOrPushInCart(
      cid,
      pid,
      quantity
    );
    res.status(200).json({ status: 'Success', payload: updatedCart });
  } catch (error) {
    console.error('Error: Controller error:error');
    if (error) res.status(400).json({ Error: 'Internal Server Error' });
  }
};

const deleteCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCart = await cartManager.deleteCart(req.params.cid);
    res.status(200).json({ status: 'Success', payload: deletedCart });
  } catch (error) {
    console.error('Error: Controller error:error');
    if (error) res.status(400).json({ Error: 'Internal Server Error' });
  }
};

export default { getCartById, createCart, updateOrPushCart, deleteCart };
