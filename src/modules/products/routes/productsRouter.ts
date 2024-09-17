import { Router } from 'express';
import productController from '../controllers/productsController';
import middleware from '../middleware/checkProduct';

const router = Router();

router.get('/', middleware.queryValidator, productController.getAllProducts);
router.get('/:pid', productController.getById);
router.post('/', middleware.productValidator, productController.postProduct);
router.put('/:pid', middleware.updatesValidator, productController.updateById);
router.delete('/:pid', productController.deleteById);

export default router;
