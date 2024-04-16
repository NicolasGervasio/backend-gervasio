import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();

router.get('/', (req, res) => {
    const producto = new ProductManager();
    const productos = producto.getProducts();

    return res.render('home', {productos});
});

router.get('/realtimeproducts', (req, res) => {
    return res.render('realTimeProducts');
});


export default router;