import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('User API Endpoints', () => {
  it('GET /api/v1/users should return initial users list', async () => {
    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it('GET /api/v1/users/:id should return user details for valid ID', async () => {
    const response = await request(app).get('/api/v1/users/1');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id', '1');
    expect(response.body.data).toHaveProperty('email', 'alex.rivera@example.com');
  });

  it('GET /api/v1/users/:id should return 404 for non-existent user', async () => {
    const response = await request(app).get('/api/v1/users/999');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('not found');
  });

  it('POST /api/v1/users should create a new user with valid body', async () => {
    const newUser = {
      name: 'Morgan Smith',
      email: 'morgan.smith@example.com',
      role: 'user',
    };

    const response = await request(app).post('/api/v1/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('name', newUser.name);
    expect(response.body.data).toHaveProperty('email', newUser.email);
  });

  it('POST /api/v1/users should return 400 for invalid body schema', async () => {
    const invalidUser = {
      name: 'A', // Name too short (<2 chars)
      email: 'not-an-email',
    };

    const response = await request(app).post('/api/v1/users').send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe('Validation error');
  });
});
