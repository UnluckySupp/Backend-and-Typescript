import productDTO from '../dto/productsDTO';
import ProductManager from '../persistence/productsRepository';
import { ProductResponse } from '../types/productsTypes';
import generateRandomCode from '../utils/productUtils';

const productManager = new ProductManager();

const getAllProducts = async (object: any): Promise<Array<ProductResponse>> => {
  try {
    const { sort, category, price } = object;
    const sorting: Record<string, number> = {};
    if (price) {
      sorting.price = price === 'cheaper' ? 1 : -1;
    } else if (sort) {
      sorting.title = sort === 'asc' ? 1 : -1;
    }
    const queries: Record<string, any> = {
      status: true,
    };
    if (category) queries.category = category;
    const products = await productManager.getAllProducts(queries, sorting);
    const resProductsDTO = productDTO.transformAllProductsDTO(products);
    return resProductsDTO;
  } catch (error) {
    throw new Error('error');
  }
};

const getById = async (pid: string): Promise<ProductResponse> => {
  try {
    const product = await productManager.getById(pid);
    const resProductDTO = productDTO.transformProductDTO(product);
    return resProductDTO;
  } catch (error) {
    throw new Error('error');
  }
};

const postProduct = async (object: any): Promise<ProductResponse> => {
  try {
    const code = generateRandomCode();
    const newProduct = {
      ...object,
      code,
    };
    const product = await productManager.createProduct(newProduct);
    const resProductDTO = productDTO.transformProductDTO(product);
    return resProductDTO;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};

const updateById = async (
  pid: string,
  updates: object
): Promise<ProductResponse> => {
  try {
    const product = await productManager.updateById(pid, updates);
    const resProductDTO = productDTO.transformProductDTO(product);
    return resProductDTO;
  } catch (error) {
    throw new Error('error');
  }
};

const deleteById = async (pid: string): Promise<ProductResponse> => {
  try {
    const product = await productManager.deleteById(pid);
    const resProductDTO = productDTO.transformProductDTO(product);
    return resProductDTO;
  } catch (error) {
    throw new Error('error');
  }
};

export default { getAllProducts, getById, postProduct, updateById, deleteById };
