/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import Product from "./entities/product"
import { productModel } from "../models/product"

export default class ProductRepository {

    constructor() { }

    public async get(id: string): Promise<Product> {
        const response = await productModel.findById(id)
        return Product.oneToDomain(response)
    }

    public async getProducts(): Promise<Product[]> {
        const response = await productModel.find()
        return Product.manyToDomain(response)
    }

    public async createProduct(product: Product): Promise<void> {
        await productModel.create(product)
    }

    public async updateProduct(id: string, product: Product): Promise<unknown> {
        const response = await productModel.findByIdAndUpdate(id, product, { returnDocument: 'after' })
        return Product.oneToDomain(response)
    }

    public async deleteProduct(id: string): Promise<void> {
        await productModel.findByIdAndRemove(id)
    }
}