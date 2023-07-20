import express, { Application } from "express"
import { CreateProduct, DeleteProduct, ReadProducts, ReadProductsById, UpdateProduct } from "./logic";
import { verifyIDProductExists, verifyNameProductExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

const PORT = 3000;
const messageRunning = `Server is running on port ${PORT}`

app.post("/products", verifyNameProductExists, CreateProduct)
app.get("/products", ReadProducts)
app.get("/products/:id", verifyIDProductExists, ReadProductsById)
app.patch("/products/:id", verifyIDProductExists, verifyNameProductExists, UpdateProduct)
app.delete("/products/:id", verifyIDProductExists, DeleteProduct)

app.listen(PORT, ()=> {
    console.log(messageRunning)
});