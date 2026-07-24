import { Router } from 'express';
import { submitContactMessage } from '../controllers/contact.controller.js';
import { validate } from '../middlewares/validate.js';
import { contactSchema } from '../validations/contact.validation.js';

const router = Router();

router.post('/', validate(contactSchema), submitContactMessage);

export default router;
