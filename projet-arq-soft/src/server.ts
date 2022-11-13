import cors from 'cors';
import express, { Application } from 'express';
import compression from 'compression';
import productsRouter from "./routes/products.router"


export default class Router {
    private readonly app: Application

    constructor() {
        this.app = express()
    }

    public registerRoutes(): Application {
        this.app
            .use(express.json())
            .use(express.urlencoded({ extended: false }))
            .use(cors())
            .use(compression());
        this.injectRoutes();
        return this.app;
    }

    private injectRoutes() {
        this.app.use('/api/v1/products', productsRouter)
    }
}
