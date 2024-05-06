import { Schema, model } from "mongoose";

const nameCollection = 'Messages';

const messagesSchema = new Schema({
    user:{type:String, required:[true, 'El nombre del usuario es obligatorio']},
    massage:{type:String, required:[true, 'El mensaje del usuario es obligatorio']}
});

export const messageModel = model(nameCollection, messagesSchema);