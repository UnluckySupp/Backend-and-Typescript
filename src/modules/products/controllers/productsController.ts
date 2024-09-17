import { Request, Response } from 'express';
import productsServices from '../services/productsServices';

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productsServices.getAllProducts(req.query);
    res.status(200).json({ status: 'success', payload: products });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve products',
      error: error,
    });
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productsServices.getById(req.params.pid);
    product
      ? res.status(200).json({ status: 'success', payload: product })
      : res.status(404).json({ status: 'Product not found' });
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve product',
      error: error,
    });
  }
};

const postProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const addedProduct = await productsServices.postProduct(req.body);
    res.status(201).json({ status: 'success', payload: addedProduct });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
      error: error,
    });
  }
};

const updateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct = await productsServices.updateById(
      req.params.pid,
      req.body
    );
    res.status(200).json({ status: 'Success', payload: updatedProduct });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong updating product',
      error: error,
    });
  }
};

const deleteById = async (req: Request, res: Response): Promise<void> => {
  try {
    await productsServices.deleteById(req.params.pid);
    res.status(200).json({
      status: 'Success',
      message: `The product with ID ${req.params.pid} has been deleted.`,
    });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong deleting product',
      error: error,
    });
  }
};

export default { getAllProducts, getById, postProduct, updateById, deleteById };
