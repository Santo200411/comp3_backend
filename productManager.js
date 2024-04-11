
class ProductManager {
    #products

    constructor(path){
        this.#products = []
        this.path = path
    }

    readFile = async () => {
        try{
            const dataJson = await fs.promises.readFile()
            return JSON.parse(dataJson)
        } catch(error){
            throw new error("Error reading file")
        }
   }
    getProductById = async(id) => {
        try {
            const product = await this.readFile()
            product = product.find((product) => product.id = id)
            if(!product){
                throw new error("Product doesn't exist")
            }

            return product
        }catch(error){
            throw new error("Error")
        }
    }

    getProducts = async() => {
        try {
            const arrayProducts = await this.readFile()
            return arrayProducts
        } catch(error){
            throw new error("Error when reading products")
        }
    }
    
    /**
     * 
     * @param {string} title 
     * @param {string} description 
     * @param {number} price 
     * @param {string} thumbnail 
     * @param {string} code 
     * @param {number} stock 
     */

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const product ={
            id: this.#getNextId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("All blanks must be filled, please try again");
          }

        const duplicated = this.#products.find((product) => product.code === code)
    
        if(duplicated){
            throw new error(`Error, code "${code} already exists`)
        } else {
            await this.#products.push(product);
            await fs.promises.writeFile(
              `${this.path}`,
              JSON.stringify(this.#products, null, "\t"),
              "utf-8"
            );
            console.log("The product has been added");
        }
    }
    #getNextId(){
        if(this.#products.length === 0) {
            return 1
        } else {
            return this.#products.at(-1).id + 1
        }
        
    }

    // Entregable 2

    deleteProduct = async (id) =>{
        try{
            const arrayProducts = await this.readFile()
            const index = arrayProducts.findIndex((product) => product.id === id)
            if(indice === -1){
                throw new error("Product doesn't exist")
            }
            arrayProducts.splice(indice, 1)
            await fs.promises.writeFile(
                `${this.path}`,
                JSON.stringify(productos, null, "\t"),
                "utf-8"
              );
            console.log("Product has been deleted succesfully")
        }catch(error){
            throw new error("Error")
        }
    }

    updateProduct = async (id, updatedProduct) =>{
        try{
            const arrayProducts = await this.readFile()
            const index = arrayProducts.findIndex((product) => product.id === id)
            if(index === -1){
                throw new error("Product doesn't exist")
            }
            arrayProducts[index] = { ...this.#products[index], ...updatedProduct };
            await fs.promises.writeFile(
                `${this.path}`,
                JSON.stringify(productos, null, "\t"),
                "utf-8"
              );
            console.log("Product has been updated succesfully")
        }catch(error){
            throw new error("Error")
        }
    }


}

export default ProductManager;