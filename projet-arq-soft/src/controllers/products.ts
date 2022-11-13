/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Request, Response } from "express"
import Product from "../repositories/entities/product"
import ProductService from "../services/product"

export default class ProductController {
    private productService!: ProductService

    constructor() {
        this.productService = new ProductService()

    }

    public async get(req: Request, res: Response): Promise<void> {
        const product = await this.productService.getProduct(req.params.id)
        res.status(200).json(product)
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const products: Product[] = await this.productService.getProducts()
        res.status(200).json(products)
    }

    public async create(req: Request, res: Response): Promise<void> {
        await this.productService.createProduct(req.body)
        res.status(201).json({ msg: "Product created" })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const productUpdated = await this.productService.updateProduct(req.params.id, req.body)
        res.status(200).json(productUpdated)
    }

    public async delete(req: Request, res: Response): Promise<void> {
        await this.productService.deleteProduct(req.params.id)
        res.status(200).json({ msg: "Product Deleted" })
    }
}