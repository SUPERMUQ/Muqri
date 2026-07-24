import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Contact API Endpoint', () => {
  it('POST /api/v1/contact should accept valid contact submission', async () => {
    const contactData = {
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      subject: 'DevOps Opportunity',
      message: 'Hi Ahmad, we love your portfolio and would like to discuss a Cloud Engineer position.',
    };

    const response = await request(app).post('/api/v1/contact').send(contactData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.name).toBe(contactData.name);
  });

  it('POST /api/v1/contact should return 400 when required fields are missing', async () => {
    const invalidData = {
      name: 'S',
      email: 'not-an-email',
      message: 'Hi',
    };

    const response = await request(app).post('/api/v1/contact').send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.error.message).toBe('Validation error');
  });
});
