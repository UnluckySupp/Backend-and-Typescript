import { Router } from 'express';
import cartsController from '../controllers/cartsController';
import { checkProductAndCart } from '../middleware/checkProductAndCart';

const router = Router();

router.get('/:cid', cartsController.getCartById);
router.post('/', cartsController.createCart);
router.put(
  '/:cid/product/:pid',
  checkProductAndCart,
  cartsController.updateOrPushCart
);
router.delete('/:cid', cartsController.deleteCart);

export default router;
