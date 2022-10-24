import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const todoSchema = new Schema({
    description: String,
    completed: Boolean,
    userId: Number,
})

export default model('Todo', todoSchema)
