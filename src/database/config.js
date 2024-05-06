import mongoose from "mongoose";

export const dbConnection = async () => {
    try{
        await mongoose.connect('mongodb+srv://nicolasgervasio:Ab5rqbh5DPaHjn8i@nicolasgervasio.hqdk6me.mongodb.net/ecommerce');
        console.log('Base de datos online');
    } catch (error) {
        console.log(`Error al levantar la base de datos ${error}`);
        process.exit(1);
    }
}