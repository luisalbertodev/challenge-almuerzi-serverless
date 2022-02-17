import { Request, Response, Router } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import Users from '../models/User';
import { isAuthenticated } from '../auth'

const router: Router = Router()

const signToken = (_id: string) => {
   return jwt.sign({ _id }, 'mi-secreto', {
      expiresIn: 60 * 60 * 24 * 365
   })
}

router.post('/register', (req: Request, res: Response) => {
   const { email, password } = req.body
   crypto.randomBytes(16, (error, salt) => {
      if (error) return error
      const newSalt = salt.toString('base64');
      crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
         const encrypted = key.toString('base64')
         Users.findOne({ email }).exec().then(user => {
            if (user) {
               return res.send('Usuario ya existe')
            }

            Users.create({ email, password: encrypted, salt: newSalt }).then(() => {
               return res.send('Usuario creado con exito')
            })
         })
      })
   })
})

router.post('/login', (req: Request, res: Response) => {
   const { email, password } = req.body

   Users.findOne({ email }).then(user => {
      console.log("login", user, user._id)

      if (!user) {
         return res.send('Usuario y/o contraseña incorrecta')
      }

      crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
         const encryptedPassword = key.toString('base64')

         if (user.password === encryptedPassword) {
            const token = signToken(`${user._id}`)
            return res.send({ token })
         }
         return res.send('Usuario y/o contraseña incorrecta')
      })
   })

})

router.get('/me', isAuthenticated, (req: any, res: Response) => {
   res.send(req.user)
})


export default router