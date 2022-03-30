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

  it('create secret when signed in', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'test@e.com',
      password: 'asdfg',
    });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'test@e.com', password: 'asdfg' });

    const res = await request(app).post('/api/v1/secrets').send({
      title: 'Bing Bong',
      description: 'Ayyo take me out to dinnah',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Bing Bong',
      description: 'Ayyo take me out to dinnah',
      createdAt: expect.any(String),
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
    const secret1 = {
      id: '1',
      title: 'Bing Bong',
      description: 'Ayyo take me out to dinnah',
      createdAt: expect.any(String),
    };

    const secret2 = {
      id: '2',
      title: 'Bing Bong 2',
      description: 'Ayyo',
      createdAt: expect.any(String),
    };

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'test@e.com', password: 'asdfg' });
    res = await agent.get('/api/v1/secrets');
    // Should get a successful response
    expect(res.body).toEqual([secret1, secret2]);
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
