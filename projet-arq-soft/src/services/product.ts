/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import Product from "../repositories/entities/product"
import ProductRepository from "../repositories/products"

export default class ProductService {
    private readonly productRepository!: ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }

    public async getProduct(id: string): Promise<unknown> {
        return this.productRepository.get(id)
    }

    public async getProducts(): Promise<Product[]> {
        const response = await this.productRepository.getProducts()
        return response
    }

    public async createProduct({ name, stock }: { name: string, stock: number }): Promise<void> {
        const product = new Product(undefined, name, stock)
        return this.productRepository.createProduct(product)
    }

    public async updateProduct(id: string, { name, stock }: { name: string, stock: number }): Promise<unknown> {
        const product = new Product(undefined, name, stock)
        return this.productRepository.updateProduct(id, product)
    }

    public async deleteProduct(id: string): Promise<void> {
        await this.productRepository.deleteProduct(id)
    }
}