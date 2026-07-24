import { AppError } from '../utils/AppError.js';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role?: 'user' | 'admin';
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: 'user' | 'admin';
}

// In-memory data store for demonstration (easily replaceable with ORM / database)
const usersStore: Map<string, User> = new Map([
  [
    '1',
    {
      id: '1',
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
  ],
  [
    '2',
    {
      id: '2',
      name: 'Jordan Lee',
      email: 'jordan.lee@example.com',
      role: 'user',
      createdAt: new Date().toISOString(),
    },
  ],
]);

export class UserService {
  public static async getAllUsers(): Promise<User[]> {
    return Array.from(usersStore.values());
  }

  public static async getUserById(id: string): Promise<User> {
    const user = usersStore.get(id);
    if (!user) {
      throw AppError.notFound(`User with ID '${id}' not found`);
    }
    return user;
  }

  public static async createUser(input: CreateUserInput): Promise<User> {
    const existing = Array.from(usersStore.values()).find((u) => u.email === input.email);
    if (existing) {
      throw AppError.conflict(`User with email '${input.email}' already exists`);
    }

    const newUser: User = {
      id: (usersStore.size + 1).toString(),
      name: input.name,
      email: input.email,
      role: input.role || 'user',
      createdAt: new Date().toISOString(),
    };

    usersStore.set(newUser.id, newUser);
    return newUser;
  }

  public static async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.getUserById(id);

    if (input.email && input.email !== user.email) {
      const emailConflict = Array.from(usersStore.values()).find((u) => u.email === input.email);
      if (emailConflict) {
        throw AppError.conflict(`User with email '${input.email}' already exists`);
      }
    }

    const updatedUser: User = {
      ...user,
      ...input,
    };

    usersStore.set(id, updatedUser);
    return updatedUser;
  }

  public static async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    usersStore.delete(id);
  }
}
