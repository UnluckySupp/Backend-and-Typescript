import { ProductMongoDB, ProductResponse } from '../types/productsTypes';

const transformProductDTO = (product: ProductMongoDB): ProductResponse => {
  const { title, price, stock, _id } = product;
  return { title, price, stock, id: _id };
};

const transformAllProductsDTO = (
  products: Array<ProductMongoDB>
): Array<ProductResponse> => {
  const productsResponse = products.map(p => {
    return {
      title: p.title,
      price: p.price,
      stock: p.stock,
      id: p._id,
    };
  });
  return productsResponse;
};

export default { transformProductDTO, transformAllProductsDTO };
