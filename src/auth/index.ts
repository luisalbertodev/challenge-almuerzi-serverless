import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Users from '../models/User'

interface IRequest extends Request {
   user: any
}

export const isAuthenticated = (req: IRequest, res: Response, next: NextFunction) => {
   const token = req.headers.authorization

   if (!token) {
      return res.sendStatus(403)
   }

   jwt.verify(token, 'mi-secreto', (err, decoded) => {
      const { _id } = decoded
      Users.findOne({ _id }).exec().then(user => {
         req.user = user
         next()
      })
   })
}

export const hasRoles = roles => (req: IRequest, res: Response, next: NextFunction) => {
   if (roles.indexOf(req.user.role) > -1) {
      return next()
   }

   return res.sendStatus(403)
}