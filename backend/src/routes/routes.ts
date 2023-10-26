import { Router } from "express";

import productController from "../ProductController";
import loginRequired from "../middleware/loginRequired";

const router = Router();

router.get("/", productController.show);
router.get("/find", loginRequired, productController.findOne);
router.post("/", loginRequired, productController.create);
router.put("/",loginRequired, productController.update);
router.delete("/",loginRequired, productController.delete);

export { router };
