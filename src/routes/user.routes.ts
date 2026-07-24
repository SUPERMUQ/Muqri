import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.js';
import {
  createUserSchema,
  updateUserSchema,
  getUserByIdSchema,
  deleteUserSchema,
} from '../validations/user.validation.js';

const router = Router();

router
  .route('/')
  .get(getUsers)
  .post(validate(createUserSchema), createUser);

router
  .route('/:id')
  .get(validate(getUserByIdSchema), getUserById)
  .put(validate(updateUserSchema), updateUser)
  .delete(validate(deleteUserSchema), deleteUser);

export default router;
