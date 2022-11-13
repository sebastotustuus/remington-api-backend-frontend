import { Router } from "express"
import ProductController from "../controllers/products"

const router = Router()
const productController = new ProductController()

router
    .get("/", productController.getAll.bind(productController))
    .get("/:id", productController.get.bind(productController))
    .post("/", productController.create.bind(productController))
    .patch("/:id", productController.update.bind(productController))
    .delete("/:id", productController.delete.bind(productController))


export default router