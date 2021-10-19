import { Schema, model } from 'mongoose'

export interface IUsers {
   email: string,
   password: string,
   salt: string,
   role: string,
}

const Users = model('User', new Schema<IUsers>({
   email: String,
   password: String,
   salt: String,
   role: { type: String, default: 'user' } // admin
}))

export default Users