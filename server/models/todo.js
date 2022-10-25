import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const todoSchema = new Schema({
    description: String,
    completed: Boolean,
    userId: String,
})

export default model('Todo', todoSchema)
