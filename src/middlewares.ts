import { NextFunction, Request, Response } from "express";
import Product from "./interface";
import market from "./database";

const verifyNameProductExists = (req: Request, res: Response, next: NextFunction):  Response | void => {
    const product: Product | undefined = market.find((product) => product.name === req.body.name);
    
    if(product) {
        return res.status(409).json({ "message": "Product already registered."})
    }

    return next();
};

const verifyIDProductExists = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { id } = req.params;
    const product: Product | undefined = market.find((product) => product.id === parseInt(id))

    if(!product) {
        return res.status(404).json({ "message": "Product not found."})
    }

    return next();
}

export { verifyNameProductExists, verifyIDProductExists }