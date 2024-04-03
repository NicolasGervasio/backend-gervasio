import Express from "express";
import products from "./routers/product.js"
import cart from "./routers/cart.js"

const app = Express();
const PORT = 8080;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Hola Mundo')
});

app.use("/api/products", products);
app.use("/api/cart", cart);

app.listen(PORT, () => {
    console.log(`Corriendo aplicación en puerto ${PORT}`);
});

