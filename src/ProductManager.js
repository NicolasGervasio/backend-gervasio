import fs from 'fs';

class ProductManager {
    #products;
    #path;
    static idProduct = 0;

    constructor() {
        this.#path = './src/data/products.json';
        this.#products = this.#GetProductFromFile();
    }

    #GiveId() {
        let id = 1;
        if (this.#products.length !== 0) {
            id = this.#products[this.#products.length - 1].id + 1;
        }
        return id;
    }

    #GetProductFromFile() {
        try {
            if (fs.existsSync(this.#path)) {
                const data = fs.readFileSync(this.#path, 'utf-8');
                return JSON.parse(data);
            }
            return [];
        } catch (error) {
            console.error('Ocurrió un error al obtener el archivo de los productos:', error);
            return [];
        }
    }

    #SaveFile() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
            console.log('Archivo de productos guardado exitosamente.');
        } catch (error) {
            console.error('Ocurrió un error al guardar el archivo de los productos:', error);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return 'Todos los parametros son requeridos [title, description, price, thumbnail, code, stock]';
        }

        const codeRepetido = this.#products.some(product => product.code === code);
        if (codeRepetido) {
            return `El código ${code} ya se encuentra registrado en otro producto`;
        }

        ProductManager.idProduct = ProductManager.idProduct + 1;
        const id = this.#GiveId();

        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.#products.push(newProduct);
        this.#SaveFile();

        return 'Producto agregado correctamente';
    }

    getProducts(limit = 0) {
        limit = Number(limit);
        if(limit > 0)
            return this.#products.slice(0, limit);
        return this.#products;
    }

    getProductById(id) {
        const product = this.#products.find(product => product.id == id);
        if (product) {
            return product;
        } else {
            return `Not found del producto con id ${id}`;
        }
    }

    updateProduct(id, updateObjets) {
        let mensaje = `El producto ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);

        if (index !== -1) {
            const { id, ...rest } = updateObjets;
            this.#products[index] = { ...this.#products[index], ...rest };
            this.#SaveFile();
            mensaje = 'Producto actualizado';
        }

        return mensaje;
    }

    deleteProduct(id) {
        let mensaje = `El producto con ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#products = this.#products.filter(p => p.id !== id);
            this.#SaveFile();
            mensaje = 'Producto eliminado';
        }

        return mensaje;
    }
}

export default ProductManager;