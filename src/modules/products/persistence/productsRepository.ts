import { ProductEntry, ProductMongoDB } from '../types/productsTypes';
import { productModel } from './models/productsModel';

export default class ProductManager {
  getAllProducts = async (
    queries: Record<string, any>,
    sorting: Record<string, any>
  ): Promise<Array<ProductMongoDB>> => {
    try {
      const products = await productModel
        .find(queries)
        .sort({ ...sorting })
        .lean();
      return products as unknown as Array<ProductMongoDB>;
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          'Error fetching products from repository:',
          error.message
        );
        throw new Error(error.message);
      }
    }
    throw new Error('Segundo error');
  };

  getById = async (pid: string): Promise<ProductMongoDB> => {
    try {
      const product = await productModel.findById(pid).lean();
      return product as unknown as ProductMongoDB;
    } catch (error) {
      throw new Error('error');
    }
  };

  createProduct = async (object: ProductEntry): Promise<ProductMongoDB> => {
    try {
      const product = await productModel.create(object);
      return product as unknown as ProductMongoDB;
    } catch (error) {
      throw new Error(`Error:${error}`);
    }
  };

  updateById = async (
    pid: string,
    updates: object
  ): Promise<ProductMongoDB> => {
    try {
      const product = await productModel.findByIdAndUpdate(pid, updates, {
        new: true,
      });
      return product as unknown as ProductMongoDB;
    } catch (error) {
      throw new Error('error');
    }
  };

  deleteById = async (pid: string): Promise<ProductMongoDB> => {
    try {
      const product = await productModel.findByIdAndUpdate(pid, {
        status: false,
      });
      return product as unknown as ProductMongoDB;
    } catch (error) {
      throw new Error('error');
    }
  };
}
