import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  res.status(200).json({
    success: true,
    data: users,
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await UserService.createUser(req.body);
  res.status(201).json({
    success: true,
    data: newUser,
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = await UserService.updateUser(id, req.body);
  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await UserService.deleteUser(id);
  res.status(200).json({
    success: true,
    message: `User '${id}' successfully deleted`,
  });
});
