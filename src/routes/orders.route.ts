import { Request, Response, Router } from 'express'
import Orders from '../models/Orders'
import { isAuthenticated, hasRoles } from '../auth'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
   Orders.find().exec()
      .then(x => res.status(200).json(x))
      .catch(error => res.status(501).json(error))
})

router.get('/:id', (req: Request, res: Response) => {
   Orders.findById(req.params.id).exec()
      .then(x => res.status(200).json(x))
      .catch(error => res.status(501).json(error))
})

router.post('/', isAuthenticated, (req: any, res: Response) => {
   const { _id } = req.user
   Orders.create({ ...req.body, user_id: _id })
      .then(x => res.status(201).json(x))
      .catch(error => res.status(501).json(error))
})

router.put('/:id', isAuthenticated, hasRoles(['admin', 'user']), (req: Request, res: Response) => {
   Orders.findByIdAndUpdate(req.params.id, req.body)
      .then(x => res.status(204).json(x))
      .catch(error => res.status(501).json(error))
})

router.delete('/:id', isAuthenticated, (req: Request, res: Response) => {
   Orders.findByIdAndDelete(req.params.id)
      .then(x => res.status(204).json(x))
      .catch(error => res.status(501).json(error))
})


export default router