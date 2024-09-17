import {Router} from "express";
import products from "../modules/products/routes/productsRouter";

const router = Router();

router.use("/products", products);

export default router;