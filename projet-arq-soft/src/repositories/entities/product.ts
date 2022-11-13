export default class Product {
    public id!: string | undefined;
    public name!: string | undefined;
    public stock!: number | undefined;


    constructor(id?: string, name?: string, stock?: number) {
        this.id = id;
        this.name = name;
        this.stock = stock;
    }

    static manyToDomain(productFromDb: unknown[]): Product[] {
        return productFromDb.map((product: any) => new Product(product._id, product.name, product.stock))
    }

    static oneToDomain(productFromDb: any) {
        return new Product(productFromDb._id, productFromDb.name, productFromDb.stock)
    }
}