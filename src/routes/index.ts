import { Router } from 'express';
import products from '../modules/products/routes/productsRouter';
import carts from '../modules/carts/routes/cartsRouter';

const router = Router();

router.use('/products', products);
router.use('carts', carts);

export default router;
