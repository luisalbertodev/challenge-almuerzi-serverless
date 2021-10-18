import { Schema, model } from 'mongoose'

export interface IMeals {
   name: string,
   desc: string,
}

const Meals = model('Meal', new Schema<IMeals>({
   name: String,
   desc: String,
}))

export default Meals