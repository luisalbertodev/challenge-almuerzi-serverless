import { Request, Response, Router } from 'express'
import Meals from '../models/Meals'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
   Meals.find().exec()
      .then(x => res.status(200).json(x))
      .catch(error => res.status(501).json(error))
})

router.get('/:id', (req: Request, res: Response) => {
   Meals.findById(req.params.id).exec()
      .then(x => res.status(200).json(x))
      .catch(error => res.status(501).json(error))
})

router.post('/', (req: Request, res: Response) => {
   Meals.create(req.body)
      .then(x => res.status(201).json(x))
      .catch(error => res.status(501).json(error))
})

router.put('/:id', (req: Request, res: Response) => {
   Meals.findByIdAndUpdate(req.params.id, req.body)
      .then(x => res.status(204).json(x))
      .catch(error => res.status(501).json(error))
})

router.delete('/:id', (req: Request, res: Response) => {
   Meals.findByIdAndDelete(req.params.id)
      .then(x => res.status(204).json(x))
      .catch(error => res.status(501).json(error))
})


export default router