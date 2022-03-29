const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ email: 'test@e.com', password: 'asdfg' });

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@e.com',
    });
  });

  it('signs in existing user', async () => {
    const user = await UserService.create({
      email: 'test@e.com',
      password: 'asdfg',
    });
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@e.com', password: 'asdfg' });
    expect(res.body).toEqual({
      message: 'Signed in successfully',
      user,
    });
  });
});
