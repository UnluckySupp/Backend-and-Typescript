import { Request, Response, NextFunction } from 'express';
import productsServices from '../../products/services/productsServices';
import cartServices from '../services/cartServices';

export const checkProductAndCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { cid, pid } = req.params;
  const existingProduct = await productsServices.getById(pid);
  if (!existingProduct)
    res
      .status(400)
      .json({ status: 'Error', message: "Product doesn't exist." });
  const existingCart = await cartServices.getCartById(cid);
  if (!existingCart)
    res.status(400).json({ status: 'Error', message: "Cart doesn't exist." });
  next();
};
