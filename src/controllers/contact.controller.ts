import { Request, Response } from 'express';
import { ContactService } from '../services/contact.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const submitContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const result = await ContactService.submitMessage(req.body);
  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out, Ahmad Muqri will get back to you shortly!',
    data: result,
  });
});
