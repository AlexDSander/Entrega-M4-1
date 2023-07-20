import { Request, Response } from "express";
import moment from "moment"
import Product from "./interface";
import market from "./database";

const idGenerator = (() => {
    let currentID = 0;
  
    return {
      generateID: () => {
        currentID++;
        return currentID;
      }
    };
  })(); 
  
  const CreateProduct = (req: Request, res: Response) => {
    const nextID = idGenerator.generateID();
  
    const product: Product = {
      id: nextID,
      name: req.body.name,
      price: req.body.price,
      weight: req.body.weight,
      section: req.body.section,
      calories: req.body.calories,
      expirationDate: moment().add(365, 'days').toDate()
    };

    market.push(product)
  
    return res.status(201).json(product);
  };

  const ReadProducts = (req: Request, res: Response) => {
    const total: number | undefined = market.reduce((acc, curr): number => {
      return acc + curr.price
    }, 0);

    const products = market;

    return res.status(200).json({total, products})
  }

  const ReadProductsById = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)

    const product = market.find((product) => product.id === id)

    return res.status(200).json(product)
  }

  const UpdateProduct = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)
    const updateProductData = req.body
  
    const findProduct = market.find((product) => product.id === id)

    const updateProduct = {
        ...findProduct,
        ...updateProductData
    }

    const replaceProduct = market.findIndex((product) => product.id === id)
    market.splice(replaceProduct, 1, updateProduct);

    return res.status(200).json(updateProduct);
  }

  const DeleteProduct = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)

    const findIndexProduct = market.findIndex((product) => product.id === id)

    market.splice(findIndexProduct, 1)

    return res.status(204).send();
  }
  
  

export {CreateProduct, ReadProducts, ReadProductsById, UpdateProduct, DeleteProduct}