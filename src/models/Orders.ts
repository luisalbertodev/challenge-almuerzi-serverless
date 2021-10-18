import { Schema, model } from 'mongoose'

export interface IOrder {
   meal_id: string | Schema.Types.ObjectId,
   user_id: string,
}

const Orders = model('Order', new Schema<IOrder>({
   meal_id: { type: Schema.Types.ObjectId, ref: 'Meal' },
   user_id: String,
}))

export default Orders