const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const User = require('../lib/models/User');

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

  it('gets all secrets when signed in', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'test@e.com',
      password: 'asdfg',
    });

    // Test authentication for end point
    // when no user is signed in:
    let res = await agent.get('/api/v1/secrets');
    // should get an "unauthenticated status"
    expect(res.status).toEqual(401);
    // if user is authenticated:
    const secrets = [
      {
        id: '1',
        title: 'Bing Bong',
        description: 'Ayyo take me out to dinnah',
        created_at: '2022-03-30 00:43:12.723336+07',
      },
    ];

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'test@e.com', password: 'asdfg' });
    res = await agent.get('/api/v1/secrets');
    // Should get a successful response
    expect(res.body).toEqual(secrets);
    expect(res.status).toEqual(200);
  });

  it('signs out user through a delete route', async () => {
    await UserService.create({
      email: 'test@e.com',
      password: 'asdfg',
    });

    const res = await request(app).delete('/api/v1/users/sessions');
    expect(res.body).toEqual({
      message: 'Signed out successfully',
      success: true,
    });
  });
});
